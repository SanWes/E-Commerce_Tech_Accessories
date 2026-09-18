// src/components/ProtectedRoute/ProtectedRoute.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Box, Typography, Button } from '@mui/material';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return (
            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    minHeight: '60vh',
                    textAlign: 'center',
                    padding: '2rem'
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Authentication Required
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Please log in to access the checkout page
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => window.location.href = '/'}
                    size="large"
                >
                    Return to Home
                </Button>
            </Box>
        );
    }

    return children;
};

export default ProtectedRoute;
