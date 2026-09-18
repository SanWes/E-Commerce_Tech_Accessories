import React from 'react';
import { Box } from '@mui/material';

const RetroBadge = ({ children, variant = 'default' }) => {
  const getBadgeStyle = () => {
    switch (variant) {
      case 'limited':
        return {
          borderColor: '#8B4513',
          backgroundColor: '#F5E6D3',
          color: '#8B4513',
        };
      case 'audio':
        return {
          borderColor: '#2E8B8B',
          backgroundColor: '#E0F0F0',
          color: '#2E8B8B',
        };
      case 'stock':
        return {
          borderColor: '#D4A017',
          backgroundColor: '#FFF8DC',
          color: '#D4A017',
        };
      default:
        return {
          borderColor: '#1A1A1D',
          backgroundColor: '#F5F5DC',
          color: '#121214',
        };
    }
  };

  const badgeStyle = getBadgeStyle();

  return (
    <Box
      sx={{
        fontFamily: '"Fira Code", "JetBrains Mono", "Courier New", monospace',
        fontSize: '0.75rem',
        fontWeight: 600,
        padding: '4px 8px',
        border: '2px solid',
        borderColor: badgeStyle.borderColor,
        backgroundColor: badgeStyle.backgroundColor,
        color: badgeStyle.color,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        display: 'inline-block',
        textAlign: 'center',
      }}
    >
      {children}
    </Box>
  );
};

export default RetroBadge;
