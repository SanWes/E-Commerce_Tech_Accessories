import React from 'react';
import { Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const Review = ({ cart }) => {
    if (!cart || !cart.line_items) return null;

    return (
        <>
        <Typography variant="h6" gutterBottom>
            Order Summary
        </Typography>
        <List disablePadding>
            {cart.line_items.map((product) => (
            <ListItem key={product.id} style={{ padding: '10px 0' }}>
                <ListItemText
                primary={product.name}
                secondary={`Quantity: ${product.quantity}`}
                />
                <Typography variant="body2">
                {product.line_total?.formatted_with_symbol || `$${product.price}`}
                </Typography>
            </ListItem>
            ))}
            <Divider />
            <ListItem style={{ padding: '10px 0' }}>
            <ListItemText primary="Subtotal" />
            <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                {cart.subtotal?.formatted_with_symbol || `$${cart.total_price || 'N/A'}`}
            </Typography>
            </ListItem>
        </List>
        </>
    );
};

export default Review;
