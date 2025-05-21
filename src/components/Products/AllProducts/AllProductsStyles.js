// AllProductsStyles.js
import { styled } from '@mui/material/styles';
import { Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';

export const StyledMain = styled('main')(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),
  minHeight: '100vh',
}));

export const StyledToolbarSpacer = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

export const StyledGridContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const StyledProductCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: 'auto',
  borderRadius: '16px',
  boxShadow: theme.shadows[3],
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

export const StyledCardMedia = styled(CardMedia)({
  height: 200,
  objectFit: 'cover',
});

export const StyledCardContent = styled(CardContent)({
  textAlign: 'center',
});

export const StyledProductTitle = styled(Typography)({
  fontWeight: 'bold',
});

export const StyledProductPrice = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  marginTop: theme.spacing(1),
}));

export const StyledAddToCartButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: 'SeaGreen',
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.success.dark,
  },
}));
