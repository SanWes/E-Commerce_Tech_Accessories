import { styled } from '@mui/material/styles';
import { Card, CardMedia, CardActions, Typography } from '@mui/material';

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
    transform: 'scale(1.015)',
  },
}));

export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 200,
  width: '100%',
  objectFit: 'cover',
  // paddingTop: '56.25%', // 16:9 aspect ratio
  borderTopLeftRadius: theme.spacing(2),
  borderTopRightRadius: theme.spacing(2),
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
  backgroundColor: '#f4f4f4',
  fontStyle: 'italic',
  boxShadow: 'inset 0px 0px 6px rgba(0,0,0,0.1)',
  padding: theme.spacing(1.5, 2),
  margin: theme.spacing(1, 0, 0),
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
  fontSize: '0.95rem',
}));
