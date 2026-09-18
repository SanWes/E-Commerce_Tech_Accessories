import { styled } from '@mui/material/styles';
import { Card, CardMedia, CardActions, Typography } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  margin: 'auto',
  borderRadius: 4,
  border: '2px solid #1A1A1D',
  backgroundColor: '#F5F5DC',
  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
  transition: 'transform 0.2s ease-in-out, border-color 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    borderColor: '#D4A017',
  },
}));

export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 200,
  width: '100%',
  objectFit: 'cover',
  transition: 'filter 0.3s ease',
}));

export const StyledCardContentWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: theme.spacing(1),
}));

export const StyledCardActions = styled(CardActions)(({ theme }) => ({
  padding: theme.spacing(2),
  justifyContent: 'flex-end',
}));

export const StyledDescription = styled(Typography)(({ theme }) => ({
  backgroundColor: '#F0EDE6',
  fontStyle: 'italic',
  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
  padding: theme.spacing(1.5, 2),
  margin: theme.spacing(1, 0, 0),
  borderRadius: 4,
  border: '1px solid #1A1A1D',
  color: '#4A4A4A',
  lineHeight: 1.6,
  fontSize: '0.95rem',
  fontFamily: '"Inter", "Roboto", sans-serif',
}));
