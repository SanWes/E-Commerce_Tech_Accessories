import { db } from './firebase'; // Your Firebase config file where Firestore is initialized
import {
    collection,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    arrayUnion,
    serverTimestamp,
} from 'firebase/firestore';

const cartsCollection = collection(db, 'carts');

/**
 * Get existing cart by ID or create a new one if not found or no ID passed
 * @param {string} [cartId] - Optional cart document ID
 * @returns {Promise<Object>} Cart object with id and data (items, createdAt)
 */
export async function getOrCreateCart(cartId) {
    try {
        if (cartId) {
        const existingCartDoc = await getDoc(doc(cartsCollection, cartId));
        if (existingCartDoc.exists()) {
            return { id: existingCartDoc.id, ...existingCartDoc.data() };
        }
    }

    // Create a new cart doc with empty items array and timestamp
    const newCartRef = doc(cartsCollection);
    const cartData = {
        items: [],
        createdAt: serverTimestamp(),
        };
    await setDoc(newCartRef, cartData);

    return { id: newCartRef.id, ...cartData };
} catch (error) {
    console.error('Error getting or creating cart:', error);
    throw error;
}
}

export async function addItemToCart(cartId, item) {
    try {
        const cartRef = doc(cartsCollection, cartId);
        await updateDoc(cartRef, {
            items: arrayUnion(item)
    });
        console.log('Item added to cart');
    } 
    catch (error) {
        console.error('Error adding item to cart:', error);
    }
}

/**
 * Update cart items for given cart ID
 * @param {string} cartId - Cart document ID
 * @param {Array} items - Array of cart items to save
 * @returns {Promise<void>}
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
 * Clear all items from cart
 * @param {string} cartId - Cart document ID
 * @returns {Promise<void>}
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
 * Get cart data by ID
 * @param {string} cartId
 * @returns {Promise<Object|null>} Cart data or null if not found
 */
export async function getCartById(cartId) {
    try {
        const cartDoc = await getDoc(doc(cartsCollection, cartId));
        if (!cartDoc.exists()) return null;
        return { id: cartDoc.id, ...cartDoc.data() };
    } catch (error) {
        console.error('Error getting cart by ID:', error);
        throw error;
    }
}
