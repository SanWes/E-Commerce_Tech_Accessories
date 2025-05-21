// NavbarStyles.js
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, ListItemText } from '@mui/material';

const drawerWidth = 0;

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  borderBottom: '5px solid rgba(0, 0, 0, 0.1)',
  backgroundColor: '#2e8b57', 
  [theme.breakpoints.up('sm')]: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  padding: theme.spacing(0.5, 2), 
}));

export const StyledToolbar = styled(Toolbar)({
  minHeight: 64,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const StyledTitle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: '#fff',
  fontWeight: 600,
  fontSize: '1.1rem',
  '& strong': {
    color: '#ffd700',
  },
}));

export const StyledImage = styled('img')(({ theme }) => ({
  marginRight: theme.spacing(1.5),
  height: 45,
  borderRadius: 4,
}));

export const StyledGrow = styled('div')({
  flexGrow: 1,
});

export const StyledButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const StyledSearch = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha('#ffffff', 0.15),
  '&:hover': {
    backgroundColor: alpha('#ffffff', 0.25),
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
  color: '#fff',
}));

export const StyledInputRoot = styled('div')({
  color: 'inherit',
});

export const StyledInputInput = styled('input')(({ theme }) => ({
  padding: theme.spacing(1, 1, 1, 0),
  paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  transition: theme.transitions.create('width'),
  width: '100%',
  color: '#fff',
  [theme.breakpoints.up('md')]: {
    width: '20ch',
  },
}));

export const StyledDrawerList = styled('div')(({ theme }) => ({
  width: 250,
  paddingTop: theme.spacing(2),
  backgroundColor: '#008c71',
  height: '100%',
}));

export const StyledListItemText = styled(ListItemText)(() => ({
  color: 'white',
  fontWeight: 'bold',
  fontSize: '1.1rem',
}));
