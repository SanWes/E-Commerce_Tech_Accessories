import React from 'react';
import { Button } from '@mui/material';

const RetroButton = ({ children, variant = 'contained', color = 'primary', ...props }) => {
  return (
    <Button
      variant={variant}
      color={color}
      sx={{
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: '4px',
        transition: 'all 0.2s ease-in-out',
        border: variant === 'outlined' ? '2px solid #1A1A1D' : 'none',
        '&:active': {
          transform: 'translateY(2px)',
        },
        '&:hover': {
          boxShadow: variant === 'contained' ? '0 4px 8px rgba(0,0,0,0.15)' : 'none',
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default RetroButton;
