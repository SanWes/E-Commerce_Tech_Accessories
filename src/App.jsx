import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { Products, Navbar, Cart, Checkout, Auth, ProtectedRoute } from './components';

import { getOrCreateCart } from './config/fetchCarts';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

const App = () => {
    const [cart, setCart] = useState(null);
    // const [order, setOrder] = useState({}); // For future checkout functionality
    // const [errorMessage, setErrorMessage] = useState(''); // For future checkout functionality

  // On first load: initialize cart
useEffect(() => {
    const initialize = async () => {
        try {
            const cartData = await getOrCreateCart();
            setCart(cartData);
            } catch (error) {
            console.error('Initialization error:', error);
            }
        };

    initialize();
}, []);


const totalItems = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

return (

        <AuthProvider>
        <CartProvider cart={cart}>

        <Router>
        <div style={{ display: 'flex' }}>
            <CssBaseline />
            <Navbar totalItems={totalItems} />
            <Routes>
            <Route
                path="/"
                element={<Products />}
            />
            <Route
                path="/auth"
                element={<Auth />}
            />
            <Route
                path="/cart"
                element={<Cart />}
            />
            <Route
                path="/checkout"
                element={
                <ProtectedRoute>
                    <Checkout
                    cart={cart}
                    setCart={setCart}
                    order={{}}
                    error={""}
                    />
                </ProtectedRoute>
                }
            />
            </Routes>
        </div>
        </Router>
        </CartProvider>
        </AuthProvider>
    );
};

export default App;
