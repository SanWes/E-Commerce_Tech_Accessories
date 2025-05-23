import React from 'react';
import { Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useCart } from '../../context/CartContext';

const Review = () => {
    const { cartData } = useCart();

    const items = cartData?.items || [];

    if (!items.length) return null;

    const formatPrice = (amount) =>
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);

    const subtotal = items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0);

    console.log('cartData.items:', items);


    return (
        <>
            <Typography variant="h4" gutterBottom>
                Order Summary
            </Typography>
            <List disablePadding>
                {items.map((item, index) => (
                    <ListItem key={item.id || index} style={{ padding: '10px 0' }}>
                        <ListItemText
                            primary={item.name || 'Unnamed Product'}
                            secondary={`Quantity: ${item.quantity}`}
                        />
                        <Typography variant="body2">
                            {formatPrice((item.price || 0) * item.quantity)}
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
