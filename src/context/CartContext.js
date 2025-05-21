// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../config/firebase'; // adjust path as needed
import { doc, onSnapshot } from 'firebase/firestore';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartId, setCartId] = useState(null);
    const [cartData, setCartData] = useState({ items: [] });
    const [cartCount, setCartCount] = useState(0);

    // Get cartId from localStorage on mount
    useEffect(() => {
        const storedCartId = localStorage.getItem('cartId');
        if (storedCartId) {
        setCartId(storedCartId);
        }
    }, []);

    // Listen to Firestore cart changes
    useEffect(() => {
        if (!cartId) return;

        const cartRef = doc(db, 'carts', cartId);

        const unsubscribe = onSnapshot(cartRef, (docSnap) => {
        if (docSnap.exists()) {
            const data = docSnap.data();
            const itemsArray = Array.isArray(data.items) ? data.items : Object.values(data.items || {});
            const totalQty = itemsArray.reduce((sum, item) => sum + (item.quantity || 0), 0);

            setCartData(data);
            setCartCount(totalQty);
        } else {
            setCartData({ items: [] });
            setCartCount(0);
        }
        });

        return () => unsubscribe();
    }, [cartId]);

    const value = {
        cartData,
        cartCount,
        setCartData,
        setCartCount,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
    };
