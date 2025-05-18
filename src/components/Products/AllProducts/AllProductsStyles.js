// AllProductsStyles.js
import { styled } from '@mui/material/styles';

export const StyledMain = styled('main')(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),
}));

export const StyledToolbarSpacer = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));
