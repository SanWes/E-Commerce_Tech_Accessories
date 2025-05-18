import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

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
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCart = async () => {
            const storedCartId = localStorage.getItem('cartId');
            const cartData = await getOrCreateCart(storedCartId);
            console.log('Fetched Cart data:', cartData);
            setCart(cartData);
                // Uncomment the following lines to set a test cart    
            // setCart({
                // id: cartData.id,
                // items: [
                //     {
                //     id: '1',
                //     name: 'Test Product',
                //     image: 'https://via.placeholder.com/150',
                //     price: 9.99,
                //     quantity: 2
                //     }
                // ]
                // });
            localStorage.setItem('cartId', cartData.id);
            setLoading(false);
        };
        fetchCart();
    }, []);

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

    const EmptyCart = () => (
        <Typography variant="subtitle1">
            You have no items in your shopping cart,{' '}
            <LinkStyled as={Link} to="/">
                start adding some
            </LinkStyled>
            !
        </Typography>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.items.map((item, index) => (
                    <Grid item xs={12} sm={4} key={index}>
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
                    Subtotal:{' '}
                    {cart.items
                        .reduce((acc, item) => acc + item.price * item.quantity, 0)
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
            {cart.items.length === 0 ? <EmptyCart /> : <FilledCart />}
        </StyledContainer>
    );
};

export default Cart;
