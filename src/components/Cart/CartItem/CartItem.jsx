import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button } from '@mui/material';

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

    const handleRemove = () => {
        onRemoveFromCart(item.id);
    };
    

    return (
        <StyledCard className="cart-item">
            <StyledCardMedia
                image={item.image || 'https://via.placeholder.com/150'}
                alt={item.name}
            />

            <StyledCardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="subtitle1">
                    ${(item.price * item.quantity).toFixed(2)}

                </Typography>
            </StyledCardContent>

            <StyledCardActions>
                <ButtonsWrapper>
                    <Button
                        size="small"
                        onClick={handleDecrease}
                        disabled={item.quantity <= 1}
                    >
                        -
                    </Button>
                    <Typography variant="body1">{item.quantity}</Typography>
                    <Button size="small" onClick={handleIncrease}>+</Button>
                </ButtonsWrapper>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleRemove}
                >
                    Remove
                </Button>
            </StyledCardActions>
        </StyledCard>
    );
};

CartItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
    }).isRequired,
    onUpdateCartQty: PropTypes.func.isRequired,
    onRemoveFromCart: PropTypes.func.isRequired,
};

export default CartItem;
