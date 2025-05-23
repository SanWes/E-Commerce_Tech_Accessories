// Shopping Cart Display Page
import React, { useEffect, useState, useCallback } from 'react';
import { Grid, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import CartItem from './CartItem/CartItem';
import {
    StyledContainer,
    Title,
    EmptyButton,
    CheckoutButton,
    LinkStyled,
    CardDetails,
} from './CartStyles';

import {
    getOrCreateCart,
    updateCartItems,
    clearCart,
} from '../../config/fetchCarts';


const Cart = () => {
    const location = useLocation();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const storedCartId = localStorage.getItem('cartId');
                const cartData = await getOrCreateCart(storedCartId);

                // console.log('Fetched Cart data:', cartData);
                
                const normalizedItems = cartData.items.map(item => ({
                    ...item,
                    price: typeof item.price === 'object' ? item.price.raw || 0 : item.price,
                    }));
                setCart({ ...cartData, items: normalizedItems });
                if (!storedCartId || storedCartId !== cartData.id) {
                    localStorage.setItem('cartId', cartData.id);
                }
            } catch (error) {
                console.error('Failed to fetch or create cart:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [location.pathname]);

    const handleUpdateQty = async (itemId, quantity) => {
        if (!cart) return;
        const updatedItems = cart.items.map(item =>
            item.id === itemId ? { ...item, quantity } : item
        );
        await updateCartItems(cart.id, updatedItems);
        setCart(prev => ({ ...prev, items: updatedItems }));
    };

    const removeFromCart = async (itemId) => {
        if (!cart) return;
        const updatedItems = cart.items.filter(item => item.id !== itemId);
        await updateCartItems(cart.id, updatedItems);
        setCart(prev => ({ ...prev, items: updatedItems }));
    };

    const handleEmptyCart = async () => {
        if (!cart) return;
        await clearCart(cart.id);
        setCart(prev => ({ ...prev, items: [] }));
    };

    if (loading) return <Typography>Loading cart...</Typography>;

    const EmptyCart = (
        <Typography variant="subtitle1">
            You have no items in your shopping cart,{' '}
            <LinkStyled as={Link} to="/">
                start adding some
            </LinkStyled>
            !
        </Typography>
    );

    const FilledCart = (
        <>
            <Grid container spacing={3}>
                {cart.items.map((item, index) => (
                    <Grid item xs={12} sm={4} key={item.id || item._id || index}>
                        <CartItem
                            item={item}
                            onUpdateCartQty={handleUpdateQty}
                            onRemoveFromCart={removeFromCart}
                        />
                    </Grid>
                ))}
            </Grid>
            <CardDetails>
                <Typography variant="h4">
                    Subtotal:{'$  '}
                    {cart.items
                        .reduce((acc, item) => acc + item.price * (item.quantity || 1), 0)
                        .toFixed(2)}{' '}
                    USD
                </Typography>
                <div>
                    <EmptyButton
                        size="large"
                        type="button"
                        variant="contained"
                        color="secondary"
                        onClick={handleEmptyCart}
                    >
                        Empty Cart
                    </EmptyButton>

                    <CheckoutButton
                        component={Link}
                        to="/checkout"
                        size="large"
                        type="button"
                        variant="contained"
                        color="primary"
                    >
                        Checkout
                    </CheckoutButton>
                </div>
            </CardDetails>
        </>
    );

    return (
    <StyledContainer>
        <div style={{ minHeight: 64 }} />
        <Title variant="h3" gutterBottom>
        Your Shopping Cart
        </Title>
        {!cart || cart.items.length === 0 ? (
        EmptyCart
        ) : (
        <>
            <div style={{ paddingBottom: '120px' }}>
            <Grid container spacing={3}>
                {cart.items.map((item, index) => (
                <Grid item xs={12} sm={4} key={item.id || item._id || index}>
                    <CartItem
                    item={item}
                    onUpdateCartQty={handleUpdateQty}
                    onRemoveFromCart={removeFromCart}
                    />
                </Grid>
                ))}
            </Grid>
            </div>
            <CardDetails>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Subtotal:{' '}
                <span style={{ fontWeight: 700, color: '#1976d2' }}>
                $
                {cart.items
                    .reduce((acc, item) => acc + item.price * (item.quantity || 1), 0)
                    .toFixed(2)}{' '}
                USD
                </span>
            </Typography>
            <div>
                <EmptyButton
                size="large"
                variant="contained"
                color="secondary"
                onClick={handleEmptyCart}
                >
                Empty Cart
                </EmptyButton>
                <CheckoutButton
                component={Link}
                to="/checkout"
                size="large"
                variant="contained"
                color="primary"
                >
                Checkout
                </CheckoutButton>
            </div>
            </CardDetails>
        </>
        )}
    </StyledContainer>
    );

};

export default Cart;
