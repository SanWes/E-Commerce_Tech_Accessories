import { styled } from '@mui/material/styles';
import { Card, CardMedia, CardContent, CardActions, Button, Typography } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  // You can add custom card-wide styles here if needed
}));

export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 260,
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

export const StyledCardActions = styled(CardActions)(({ theme }) => ({
  justifyContent: 'space-between',
}));

export const ButtonsWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));
