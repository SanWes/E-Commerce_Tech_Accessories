// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../config/firebase'; 
import { doc, onSnapshot, setDoc } from 'firebase/firestore';  

// Create a context for the cart
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

// Provider component that wraps the app and makes cart data available
export const CartProvider = ({ children }) => {
  const [cartId, setCartId] = useState(null);          // Unique ID for user's cart (from localStorage)
  const [cartData, setCartData] = useState({ items: [] }); // Cart data including all items
  const [cartCount, setCartCount] = useState(0);        // Total item quantity in cart

  // On initial mount, get cartId from localStorage (if any)
    useEffect(() => {
        const storedCartId = localStorage.getItem('cartId');
            if (storedCartId) {
                setCartId(storedCartId);
            }
    }, []);

    // Set up a real-time listener for the cart document in Firestore
    useEffect(() => {
        if (!cartId) return;

        const cartRef = doc(db, 'carts', cartId);

        const unsubscribe = onSnapshot(cartRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
            
            // ////////////////////////////////// 
            // Normalize items field
                    let itemsArray = [];

                    if (Array.isArray(data.items)) {
                    itemsArray = data.items;
                    } else if (typeof data.items === 'object' && data.items !== null) {
                    itemsArray = Object.values(data.items);
                    }

                    // Remove falsy or malformed items
                    itemsArray = itemsArray.filter(item => item && item.id && typeof item.quantity === 'number');

                const totalQty = itemsArray.reduce(
                    (sum, item) => sum + (item.quantity || 0),
                0
                );

                setCartData({ ...data, items: itemsArray });
                setCartCount(totalQty);
            } else {
                // Cart does not exist or was deleted
                setCartData({ items: [] });
                setCartCount(0);
            }
        });

        return () => unsubscribe(); // Clean up the listener on unmount
    }, [cartId]);

    // Function to clear the cart both locally and in Firestore
    const clearCart = async () => {
        if (!cartId) return;

        try {
            const cartRef = doc(db, 'carts', cartId);
            await setDoc(cartRef, { items: [] }, { merge: true }); // Clear items in Firestore

            setCartData({ items: [] }); // Clear local cart state
            setCartCount(0); // Reset count
        } catch (error) {
            console.error('Failed to clear cart:', error);
        }
    };

    // Values that any component using the context can access
    const value = {
        cartData,
        cartCount,
        setCartData,
        setCartCount,
        clearCart, 
    };

    return (
        <CartContext.Provider value={value}>
        {children}
        </CartContext.Provider>
    );
};
