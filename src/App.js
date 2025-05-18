import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import { Products, Navbar, Cart, Checkout } from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { fetchAllProducts } from './config/fetchAllProducts';
import {
    getOrCreateCart,
    addItemToCart,
    updateCartItems,
    clearCart,
    getCartById,
} from './config/fetchCarts';

const App = () => {
const [products, setProducts] = useState([]);
const [cart, setCart] = useState(null);
const [order, setOrder] = useState({});
const [errorMessage, setErrorMessage] = useState('');

// On first load: fetch products and initialize cart
useEffect(() => {
    const initialize = async () => {
        try {
            const [productsData, cartData] = await Promise.all([
            fetchAllProducts(),
            getOrCreateCart() // Can pass existing ID later (e.g. from localStorage)
            ]);

            setProducts(productsData);
            setCart(cartData);
        } catch (error) {
            console.error('Initialization error:', error);
        }
        };

        initialize();
    }, []);

    const handleAddToCart = async (product) => {
        if (!cart) return;

        const item = {
            id: product.id,
            name: product.name,
            image: product.image?.url,
            price: product.price,
            quantity: 1,
        };

        try {
            await addItemToCart(cart.id, item);
            const updatedCart = await getCartById(cart.id);
            setCart(updatedCart);
            } catch (err) {
            console.error('Failed to add to cart:', err);
            }
    };

    const handleUpdateQty = async (productId, quantity) => {
        if (!cart) return;

        const updatedItems = cart.items.map(item =>
        item.id === productId ? { ...item, quantity } : item
        );

        try {
            await updateCartItems(cart.id, updatedItems);
            setCart(prev => ({ ...prev, items: updatedItems }));
            } catch (error) {
            console.error('Failed to update quantity:', error);
        }
    };

    const removeFromCart = async (productId) => {
        if (!cart) return;

        const updatedItems = cart.items.filter(item => item.id !== productId);

        try {
            await updateCartItems(cart.id, updatedItems);
            setCart(prev => ({ ...prev, items: updatedItems }));
            } catch (error) {
            console.error('Failed to remove item:', error);
        }
    };

    const handleEmptyCart = async () => {
        if (!cart) return;

        try {
            await clearCart(cart.id);
            setCart(prev => ({ ...prev, items: [] }));
            } catch (error) {
            console.error('Failed to clear cart:', error);
        }
    };

    const handleCaptureCheckout = (checkoutData) => {
        try {
            setOrder(checkoutData);
            handleEmptyCart();
            } catch (error) {
            setErrorMessage('Checkout failed: ' + error.message);
        }
    };

    const totalItems = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

    return (
        <Router>
        <div style={{ display: 'flex' }}>
            <CssBaseline />
            <Navbar totalItems={totalItems} />
            <Routes>
            <Route
                path="/"
                element={<Products products={products} onAddToCart={handleAddToCart} />}
            />
            <Route
                path="/cart"
                element={
                <Cart
                    cart={cart}
                    handleUpdateQty={handleUpdateQty}
                    removeFromCart={removeFromCart}
                    handleEmptyCart={handleEmptyCart}
                />
                }
            />
            <Route
                path="/checkout"
                element={
                <Checkout
                    cart={cart}
                    order={order}
                    onCaptureCheckout={handleCaptureCheckout}
                    error={errorMessage}
                />
                }
            />
            </Routes>
        </div>
        </Router>
    );
};

export default App;
