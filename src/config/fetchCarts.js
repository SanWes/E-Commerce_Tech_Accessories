import { db } from './firebase';
import {
    collection,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    serverTimestamp,
} from 'firebase/firestore';

const cartsCollection = collection(db, 'carts');
const productsCollection = collection(db, 'products');

/**
 * Get existing cart by ID from localStorage or Firestore, or create a new one
 */
export async function getOrCreateCart() {
    try {
        let cartId = localStorage.getItem('cartId');

        if (cartId && typeof cartId === 'string') {
            const existingCartDoc = await getDoc(doc(cartsCollection, cartId));
            if (existingCartDoc.exists()) {
                return { id: existingCartDoc.id, ...existingCartDoc.data() };
            }
        }

        // Create new cart
        const newCartRef = doc(cartsCollection);
        const cartData = {
            items: [],
            createdAt: serverTimestamp(),
        };

        await setDoc(newCartRef, cartData);
        localStorage.setItem('cartId', newCartRef.id);

        return { id: newCartRef.id, ...cartData };
    } catch (error) {
        console.error('Error getting or creating cart:', error);
        throw error;
    }
}

/**
 * Fetch product by ID from Firestore
 */
export async function fetchProductById(productId) {
    try {
        if (typeof productId !== 'string') {
            throw new Error('Invalid product ID. It must be a string.');
        }

        const productRef = doc(productsCollection, productId);
        const productSnap = await getDoc(productRef);

        if (!productSnap.exists()) {
            throw new Error(`Product with ID "${productId}" not found.`);
        }

        return productSnap.data();
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw error;
    }
}

/**
 * Add or update item in cart
 */
export async function addToCart(cartId, productInput) {
    try {
        if (!cartId || !productInput?.id) {
            throw new Error('Cart ID and valud Product Input are required.');
        }

        const cartRef = doc(cartsCollection, cartId);
        const cartSnap = await getDoc(cartRef);

        let cartData = { items: [] };
        if (cartSnap.exists()) {
            cartData = cartSnap.data();
        }

        // const product = await fetchProductById(productId.id);
        const productId = productInput.id;

        const existingItemIndex = cartData.items.findIndex(
            (item) => item.id === productId
        );

        if (existingItemIndex !== -1) {
            
        // If product already exists, just increase quantity
            cartData.items[existingItemIndex].quantity += productInput.quantity || 1;
        } else {
            // Add new item to the cart
            cartData.items.push({
                id: productId,
                name: productInput.name || '',
                image: productInput.image || '',
                price: productInput.price || 0,
                quantity: productInput.quantity || 1,
            });
        }

        await updateCartItems(cartId, cartData.items);
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
}

/**
 * Fully update items array (overwrite existing with modified)
 */
export async function updateCartItems(cartId, items) {
    try {
        const cartRef = doc(cartsCollection, cartId);
        await updateDoc(cartRef, {
            items,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error('Error updating cart items:', error);
        throw error;
    }
}

/**
 * Clear cart
 */
export async function clearCart(cartId) {
    try {
        const cartRef = doc(cartsCollection, cartId);
        await updateDoc(cartRef, {
            items: [],
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error('Error clearing cart:', error);
        throw error;
    }
}

/**
 * Fetch cart by ID
 */
export async function getCartById(cartId) {
    try {
        if (typeof cartId !== 'string') {
            throw new Error('Invalid cart ID. Must be a string.');
        }

        const cartDoc = await getDoc(doc(cartsCollection, cartId));
        if (!cartDoc.exists()) return null;
        return { id: cartDoc.id, ...cartDoc.data() };
    } catch (error) {
        console.error('Error getting cart by ID:', error);
        throw error;
    }
}
