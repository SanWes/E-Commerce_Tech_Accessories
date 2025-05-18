// OneProduct.jsx
import React from 'react';
import {
    Typography,
    IconButton,
} from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';

import {
    StyledCard,
    StyledCardMedia,
    StyledCardContentWrapper,
    StyledCardActions,
} from './OneProductStyles';

const OneProduct = ({ product, onAddToCart }) => {
return (
    <StyledCard>
        <StyledCardMedia
            image={product.image?.url}
            title={product.name}
        />
    <div>
        <StyledCardContentWrapper>
            <Typography variant="h5" gutterBottom>
            {product.name}
            </Typography>
            <Typography variant="h5">
            {product.price?.formatted_with_symbol}
            </Typography>
        </StyledCardContentWrapper>
        <Typography
            variant="body2"
            color="textSecondary"
            dangerouslySetInnerHTML={{ __html: product.description }}
            sx={{ paddingX: 2 }}
            />
        </div>
        <StyledCardActions disableSpacing>
            <IconButton
            aria-label="Add to Cart"
            onClick={() => onAddToCart(product.id, 1)}
            >
            <AddShoppingCart />
            Add to Cart
        </IconButton>
        </StyledCardActions>
    </StyledCard>
    );
};

export default OneProduct;
