import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { Products, Navbar, Cart, Checkout } from './components';

import { fetchAllProducts } from './config/fetchAllProducts';
import { getOrCreateCart } from './config/fetchCarts';

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
                getOrCreateCart(),
            ]);

            setProducts(productsData);
            setCart(cartData);
            } catch (error) {
            console.error('Initialization error:', error);
            }
        };

    initialize();
}, []);

const handleCaptureCheckout = (checkoutData) => {
    try {
        setOrder(checkoutData);
        setCart((prev) => ({ ...prev, items: [] })); // simple reset after order
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
                element={<Products products={products} />}
            />
            <Route
                path="/cart"
                element={<Cart />}
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
