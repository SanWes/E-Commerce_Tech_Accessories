import React from 'react';
import {
    Typography,
    Button,
    CardContent,
    Box,
} from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import RetroBadge from '../../common/RetroBadge';

import {
    StyledCard,
    StyledCardMedia,
    StyledCardContentWrapper,
    StyledCardActions,
    StyledDescription,
} from './OneProductStyles';

const OneProduct = ({ product, onAddToCart }) => {
    // Generate a mock model number for retro effect
    const modelNumber = `CGS-${product.id.toString().padStart(4, '0')}`;
    
    return (
        <StyledCard className="product-schematic">
        <StyledCardMedia
            component="img"
            loading="lazy"
            image={product.image || 'https://via.placeholder.com/300'}
            title={product.name}
        />

        <CardContent sx={{ paddingBottom: 0 }}>
            <StyledCardContentWrapper>
            
            <Typography 
                variant="caption" 
                sx={{ 
                    fontFamily: '"Fira Code", "JetBrains Mono", "Courier New", monospace',
                    color: '#4A4A4A',
                    marginBottom: 0.5,
                }}
            >
                {modelNumber}
            </Typography>
            
            <Typography variant="h6" fontWeight={600} gutterBottom>
                {product.name}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1 }}>
                <Typography variant="body1" color="text.secondary" fontWeight={600}>
                    ${product.price}
                </Typography>
                <RetroBadge variant="stock">IN STOCK</RetroBadge>
            </Box>
            </StyledCardContentWrapper>

            {product.description && (
            <Box>
                <StyledDescription>
                {product.description}
                </StyledDescription>
            </Box>
            )}
        </CardContent>

        <StyledCardActions>
            <Button
            variant="contained"
            color="primary"
            startIcon={<AddShoppingCart />}
            onClick={() => onAddToCart(product.id, 1)}
            sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 4,
                '&:active': {
                    transform: 'translateY(2px)',
                },
            }}
            >
            Load to Cart
            </Button>
        </StyledCardActions>
        </StyledCard>
    );
};

export default OneProduct;
