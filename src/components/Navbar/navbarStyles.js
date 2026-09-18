// NavbarStyles.js
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, ListItemText } from '@mui/material';

const drawerWidth = 0;

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  borderBottom: '2px solid #1A1A1D',
  backgroundColor: '#F0EDE6',
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
  color: '#121214',
  fontWeight: 600,
  fontSize: '1.1rem',
  fontFamily: '"Inter", "Roboto", sans-serif',
  '& strong': {
    color: '#D4A017',
  },
}));

export const StyledImage = styled('img')(({ theme }) => ({
  marginRight: theme.spacing(1.5),
  height: 45,
  borderRadius: 4,
  border: '2px solid #1A1A1D',
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
  backgroundColor: alpha('#1A1A1D', 0.05),
  border: '2px solid #1A1A1D',
  '&:hover': {
    backgroundColor: alpha('#1A1A1D', 0.1),
    borderColor: '#D4A017',
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
  color: '#121214',
}));

export const StyledInputRoot = styled('div')({
  color: 'inherit',
});

export const StyledInputInput = styled('input')(({ theme }) => ({
  padding: theme.spacing(1, 1, 1, 0),
  paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  transition: theme.transitions.create('width'),
  width: '100%',
  color: '#121214',
  fontFamily: '"Fira Code", "JetBrains Mono", "Courier New", monospace',
  [theme.breakpoints.up('md')]: {
    width: '20ch',
  },
}));

export const StyledDrawerList = styled('div')(({ theme }) => ({
  width: 250,
  paddingTop: theme.spacing(2),
  backgroundColor: '#F0EDE6',
  borderRight: '2px solid #1A1A1D',
  height: '100%',
}));

export const StyledListItemText = styled(ListItemText)(() => ({
  color: '#121214',
  fontWeight: 600,
  fontSize: '1.1rem',
  fontFamily: '"Inter", "Roboto", sans-serif',
}));
