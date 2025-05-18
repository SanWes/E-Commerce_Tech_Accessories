import React from 'react';
import {
    Typography,
    Button,
} from '@mui/material';

import {
    StyledCard,
    StyledCardMedia,
    StyledCardContent,
    StyledCardActions,
    ButtonsWrapper,
} from './CartItemStyles';

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
    const handleDecrease = () => {
        if (item.quantity > 1) {
            onUpdateCartQty(item.id, item.quantity - 1);
        }
    };

    const handleIncrease = () => {
        onUpdateCartQty(item.id, item.quantity + 1);
    };

    return (
        <StyledCard className="cart-item">
            <StyledCardMedia image={item.image} alt={item.name} />

            <StyledCardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="subtitle1">
                    ${(item.price * item.quantity).toFixed(2)}
                </Typography>
            </StyledCardContent>

            <StyledCardActions>
                <ButtonsWrapper>
                    <Button size="small" onClick={handleDecrease}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button size="small" onClick={handleIncrease}>+</Button>
                </ButtonsWrapper>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => onRemoveFromCart(item.id)}
                >
                    Remove
                </Button>
            </StyledCardActions>
        </StyledCard>
    );
};

export default CartItem;
