import React from 'react';
import {
    Typography,
    Button,
    CardContent,
    Box,
} from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';

import {
    StyledCard,
    StyledCardMedia,
    StyledCardContentWrapper,
    StyledCardActions,
    StyledDescription,
    } from './OneProductStyles';

const OneProduct = ({ product, onAddToCart }) => {
    return (
        <StyledCard>
        <StyledCardMedia
            image={product.image || 'https://via.placeholder.com/300'}
            title={product.name}
        />

        <CardContent>

            <StyledCardContentWrapper>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {product.name}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    ${product.price}
                </Typography>
            </StyledCardContentWrapper>

            <Box>
            <StyledDescription>
                {product.description}
            </StyledDescription>
            </Box>


        </CardContent>

        <StyledCardActions>
            <Button
            variant="contained"
            color="primary"
            startIcon={<AddShoppingCart />}
            onClick={() => onAddToCart(product.id, 1)}
            >
            Add to Cart
            </Button>
        </StyledCardActions>
        </StyledCard>
    );
};

export default OneProduct;
