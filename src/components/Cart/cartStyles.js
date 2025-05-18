import { styled } from '@mui/material/styles';
import { Container, Typography, Button } from '@mui/material';

export const StyledContainer = styled(Container)(({ theme }) => ({
  // toolbar mixin is not directly available here; keep it in component or use sx prop
}));

export const Title = styled(Typography)(({ theme }) => ({
  marginTop: '5%',
}));

export const EmptyButton = styled(Button)(({ theme }) => ({
  minWidth: '150px',
  [theme.breakpoints.down('xs')]: {
    marginBottom: '5px',
  },
  [theme.breakpoints.up('xs')]: {
    marginRight: '20px',
  },
}));

export const CheckoutButton = styled(Button)(({ theme }) => ({
  minWidth: '150px',
}));

export const LinkStyled = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main, // optional: add color
  cursor: 'pointer',
}));

export const CardDetails = styled('div')(({ theme }) => ({
  display: 'flex',
  marginTop: '10%',
  width: '100%',
  justifyContent: 'space-between',
}));
