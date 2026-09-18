import React from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import RetroButton from '../common/RetroButton';

const StyledHeroContainer = styled(Box)(({ theme }) => ({
  minHeight: '70vh',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#F0EDE6',
  backgroundImage: `
    linear-gradient(rgba(26, 26, 29, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26, 26, 29, 0.02) 1px, transparent 1px)
  `,
  backgroundSize: '20px 20px',
  padding: theme.spacing(8, 0),
}));

const StyledSpecPanel = styled(Box)(({ theme }) => ({
  border: '2px solid #1A1A1D',
  backgroundColor: '#F5F5DC',
  padding: theme.spacing(2),
  fontFamily: '"Fira Code", "JetBrains Mono", "Courier New", monospace',
  fontSize: '0.875rem',
  marginBottom: theme.spacing(3),
  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
}));

const StyledProductCard = styled(Card)(({ theme }) => ({
  border: '2px solid #1A1A1D',
  borderRadius: '4px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  backgroundColor: '#F5F5DC',
}));

const HeroTerminal = () => {
  return (
    <StyledHeroContainer>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Left Side - Hero Content */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                marginBottom: 2,
                color: '#121214',
                fontFamily: '"Inter", "Roboto", sans-serif',
              }}
            >
              CodiGo Space
            </Typography>
            <Typography
              variant="h5"
              sx={{
                marginBottom: 3,
                color: '#4A4A4A',
                fontFamily: '"Inter", "Roboto", sans-serif',
              }}
            >
              Premium Tech Accessories for the Modern Enthusiast
            </Typography>

            {/* Technical Spec Panel */}
            <StyledSpecPanel>
              <Typography variant="body2" sx={{ color: '#121214', marginBottom: 1 }}>
                {'>'} SYSTEM STATUS: ONLINE
              </Typography>
              <Typography variant="body2" sx={{ color: '#4A4A4A', marginBottom: 1 }}>
                {'>'} CATALOG: 8 SMARTPHONES AVAILABLE
              </Typography>
              <Typography variant="body2" sx={{ color: '#4A4A4A' }}>
                {'>'} AUTHENTICATION: REQUIRED FOR CHECKOUT
              </Typography>
            </StyledSpecPanel>

            <RetroButton
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to="#products"
              sx={{ marginBottom: 2 }}
            >
              Browse Collection
            </RetroButton>
          </Grid>

          {/* Right Side - Product Display */}
          <Grid item xs={12} md={6}>
            <StyledProductCard>
              <CardMedia
                component="img"
                height="400"
                image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop"
                alt="Featured Product"
                sx={{
                  objectFit: 'cover',
                  filter: 'grayscale(20%)',
                }}
              />
            </StyledProductCard>
          </Grid>
        </Grid>
      </Container>
    </StyledHeroContainer>
  );
};

export default HeroTerminal;
