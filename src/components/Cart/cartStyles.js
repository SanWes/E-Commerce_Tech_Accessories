import { styled } from '@mui/material/styles';
import { Container, Typography, Button } from '@mui/material';

export const StyledContainer = styled(Container)(({ theme }) => ({
  // toolbar mixin is not directly available here; keep it in component or use sx prop
}));

export const Title = styled(Typography)(({ theme }) => ({
  marginTop: '5%',
  fontFamily: '"Inter", "Roboto", sans-serif',
  fontWeight: 700,
}));

export const EmptyButton = styled(Button)(({ theme }) => ({
  minWidth: '150px',
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: 4,
  border: '2px solid #1A1A1D',
  '&:active': {
    transform: 'translateY(2px)',
  },
  [theme.breakpoints.down('xs')]: {
    marginBottom: '5px',
  },
  [theme.breakpoints.up('xs')]: {
    marginRight: '20px',
  },
}));

export const CheckoutButton = styled(Button)(({ theme }) => ({
  minWidth: '150px',
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: 4,
  '&:active': {
    transform: 'translateY(2px)',
  },
}));

export const LinkStyled = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  color: '#D4A017',
  fontWeight: 600,
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

export const CardDetails = styled('div')(({ theme }) => ({
  position: 'sticky',
  bottom: 0,
  left: 0,
  zIndex: 1000,
  backgroundColor: '#F5F5DC',
  padding: theme.spacing(3),
  marginTop: theme.spacing(4),
  border: '2px solid #1A1A1D',
  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
  borderRadius: '4px 4px 0 0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  flexWrap: 'wrap',
  gap: theme.spacing(2),

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));
