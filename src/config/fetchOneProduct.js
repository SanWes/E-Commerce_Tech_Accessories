// src/config/fetchOneProduct.js
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export const fetchOneProduct = async (productId) => {
    try {
        const docRef = doc(db, 'products', productId);
        const snapshot = await getDoc(docRef);

        if (!snapshot.exists()) {
        throw new Error('Product not found');
        }

        return {
        id: snapshot.id,
        ...snapshot.data(),
        };
    } catch (error) {
        console.error('Error fetching single product:', error);
        throw error;
    }
};
