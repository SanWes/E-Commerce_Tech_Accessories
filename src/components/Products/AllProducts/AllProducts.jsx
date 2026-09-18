import React, { useEffect, useState } from 'react';
import { Grid, Snackbar, Alert, Skeleton, Button, Box, Typography } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import OneProduct from '../OneProduct/OneProduct';

import {
    StyledMain,
    StyledToolbarSpacer,
    StyledGridContainer
} from './AllProductsStyles';

import useProducts from '../../../hooks/useProducts';
import { getOrCreateCart, addToCart } from '../../../config/fetchCarts';

const AllProducts = () => {
    const { products, loading, error } = useProducts('smartphones');
    const [cart, setCart] = useState(null);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // Get or create cart on mount
    useEffect(() => {
        const initCart = async () => {
        try {
            const cartData = await getOrCreateCart();
            setCart(cartData);
        } catch (error) {
            console.error("Error initializing cart:", error);
        }
        };

        initCart();
    }, []);

    // Add item to Firebase cart
    const handleAddToCart = async (productId, quantity) => {
        if (!cart) return;

        const product = products.find((p) => p.id === productId);
        if (!product) return;

        // console.log("🔍 ADD TO CART DEBUG", {
        // cartId: cart?.id,
        // PRid: product.id,
        // product,
        // quantity,
        // image: product.image,
        // price: product.price
        // });

        try {
        await addToCart(cart.id, {
            id: product.id,
            name: product.name || '',
            image: product.image || '',
            price: product.price || 0,
            quantity: quantity || 1,
        });

        const updatedCart = await getOrCreateCart(cart.id);
        setCart(updatedCart);

        // alert(`${product.name} added to cart`);
        setSnackbarMessage(`${product.name} added to cart`);
        setSnackbarOpen(true);

        } catch (error) {
        console.error("Error adding item to cart:", error);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };


    return (
        <StyledMain>
        <StyledToolbarSpacer />

        {error ? (
            <Box sx={{ textAlign: 'center', marginTop: '4rem', padding: '2rem' }}>
            <Typography variant="h6" color="error" gutterBottom>
                Failed to load products
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
                {error}
            </Typography>
            <Button 
                variant="contained" 
                startIcon={<Refresh />}
                onClick={() => window.location.reload()}
                sx={{ marginTop: '1rem' }}
            >
                Retry
            </Button>
            </Box>
        ) : loading ? (
            <StyledGridContainer container spacing={4}>
            {[...Array(8)].map((_, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <Box sx={{ height: '100%' }}>
                    <Skeleton variant="rectangular" width="100%" height={200} />
                    <Skeleton variant="text" width="80%" height={32} sx={{ mt: 2 }} />
                    <Skeleton variant="text" width="40%" height={24} sx={{ mt: 1 }} />
                    <Skeleton variant="rectangular" width="100%" height={40} sx={{ mt: 2 }} />
                </Box>
                </Grid>
            ))}
            </StyledGridContainer>
        ) : (
            <StyledGridContainer container spacing={4}>
            {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <OneProduct product={product} onAddToCart={handleAddToCart} />
                </Grid>
            ))}
            </StyledGridContainer>
        )}

        <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

        </StyledMain>
    );
};

export default AllProducts;
