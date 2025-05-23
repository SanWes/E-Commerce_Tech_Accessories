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
  position: 'sticky',
  bottom: 0,
  left: 0,
  zIndex: 1000,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
  marginTop: theme.spacing(4),
  boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.1)',
  borderTop: `1px solid ${theme.palette.divider}`,
  borderRadius: '12px 12px 0 0',
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
