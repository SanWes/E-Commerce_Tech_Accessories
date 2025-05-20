import { styled } from '@mui/material/styles';
import { Card, CardMedia, CardActions, Typography } from '@mui/material';

// StyledCard for the outer card container
export const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  margin: 'auto',
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.01)',
  },
}));

// StyledCardMedia for the image section
export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 0,
  paddingTop: '56.25%', // 16:9 aspect ratio
  borderTopLeftRadius: theme.spacing(2),
  borderTopRightRadius: theme.spacing(2),
}));

// Wrapper for product name and price
export const StyledCardContentWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
}));


// StyledCardActions for the button row
export const StyledCardActions = styled(CardActions)(({ theme }) => ({
  padding: theme.spacing(2),
  justifyContent: 'flex-end',
}));


// Styled Description Box
export const StyledDescription = styled(Typography)(({ theme }) => ({
  backgroundColor: '#f4f4f4',
  fontStyle: 'italic',
  boxShadow: 'inset 0px 0px 6px rgba(0,0,0,0.1)',
  padding: theme.spacing(1.5, 2),
  margin: theme.spacing(0, 2, 2),
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
  fontSize: '0.95rem',
}));