import React from 'react';
import { Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const Review = ({ cart }) => {
    // Safely extract actual cart items from possible nested structure
    const cartItems = Array.isArray(cart?.items?.[1]) ? cart.items[1] : [];

    if (!cartItems || cartItems.length === 0) return null;

    // Simple helper to format prices
    const formatPrice = (amount) =>
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);

    // Calculate subtotal
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Order Summary
            </Typography>
            <List disablePadding>
                {cartItems.map((item) => (
                    <ListItem key={item.id} style={{ padding: '10px 0' }}>
                        <ListItemText
                            primary={item.name}
                            secondary={`Quantity: ${item.quantity}`}
                        />
                        <Typography variant="body2">
                            {formatPrice(item.price * item.quantity)}
                        </Typography>
                    </ListItem>
                ))}
                <Divider />
                <ListItem style={{ padding: '10px 0' }}>
                    <ListItemText primary="Subtotal" />
                    <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                        {formatPrice(subtotal)}
                    </Typography>
                </ListItem>
            </List>
        </>
    );
};

export default Review;
