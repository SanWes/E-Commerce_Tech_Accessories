// NavbarStyles.js
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Toolbar, Typography } from '@mui/material';

const drawerWidth = 0;

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  borderBottom: '5px solid rgba(0, 0, 0, 0.12)',
  backgroundColor: 'SeaGreen',
  [theme.breakpoints.up('sm')]: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
}));

export const StyledToolbar = styled(Toolbar)``;

export const StyledTitle = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  alignItems: 'center',
  display: 'flex',
  textDecoration: 'none',
}));

export const StyledImage = styled('img')(({ theme }) => ({
  marginRight: '10px',
}));

export const StyledGrow = styled('div')({
  flexGrow: 1,
});

export const StyledButtonContainer = styled('div')({});

// Optional: If you plan to add a search bar later, here’s the reusable search styles:
export const StyledSearch = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

export const StyledSearchIcon = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledInputRoot = styled('div')({
  color: 'inherit',
});

export const StyledInputInput = styled('input')(({ theme }) => ({
  padding: theme.spacing(1, 1, 1, 0),
  paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  transition: theme.transitions.create('width'),
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '20ch',
  },
}));
