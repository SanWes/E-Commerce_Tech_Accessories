import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import OneProduct from '../OneProduct/OneProduct';

import {
    StyledMain,
    StyledToolbarSpacer,
    } from './AllProductsStyles';

import { fetchAllProducts } from '../../../config/fetchAllProducts';
import { getOrCreateCart, addItemToCart } from '../../../config/fetchCarts';

    const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState(null);

    // Load all products
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchAllProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

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

        try {
            await addItemToCart(cart.id, {
            id: product.id,
            name: product.name || '',
            image: product.image?.url || '',
            price: {
                raw: product.price?.raw || 0,
                formatted: product.price?.formatted || '',
                formatted_with_symbol: product.price?.formatted_with_symbol || ''
            },
            quantity: quantity || 1,
            });

            // Refetch updated cart 
            const updatedCart = await getOrCreateCart(cart.id);
            setCart(updatedCart);

            alert(`${product.name} added to cart`);
            } catch (error) {
            console.error("Error adding item to cart:", error);
            }
    };

    return (
        <StyledMain>
        <StyledToolbarSpacer />

        {loading ? (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <CircularProgress />
            </div>
        ) : (
            <Grid container justifyContent="center" spacing={4}>
            {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <OneProduct product={product} onAddToCart={handleAddToCart} />
                </Grid>
            ))}
            </Grid>
        )}
        </StyledMain>
    );
};

export default AllProducts;
