import { createTheme } from '@mui/material/styles';

const retroTheme = createTheme({
  palette: {
    primary: {
      main: '#D4A017', // Retro amber
      light: '#E5C158',
      dark: '#A67F00',
      contrastText: '#121214',
    },
    secondary: {
      main: '#2E8B8B', // Muted teal
      light: '#4AA8A8',
      dark: '#1E6B6B',
      contrastText: '#F0EDE6',
    },
    error: {
      main: '#8B4513', // Vintage burgundy
    },
    background: {
      default: '#F0EDE6', // Vintage hardware off-white
      paper: '#F5F5DC', // Cream for cards
    },
    text: {
      primary: '#121214', // Deep charcoal
      secondary: '#4A4A4A', // Muted charcoal
    },
    divider: '#1A1A1D', // Dark charcoal for borders
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      fontWeight: 600,
    },
    body1: {
      fontFamily: '"Inter", "Roboto", sans-serif',
    },
    body2: {
      fontFamily: '"Inter", "Roboto", sans-serif',
    },
    // Monospace for technical specs
    subtitle1: {
      fontFamily: '"Fira Code", "JetBrains Mono", "Courier New", monospace',
    },
    subtitle2: {
      fontFamily: '"Fira Code", "JetBrains Mono", "Courier New", monospace',
    },
    caption: {
      fontFamily: '"Fira Code", "JetBrains Mono", "Courier New", monospace',
    },
  },
  shape: {
    borderRadius: 4, // Slightly more angular for retro feel
  },
  shadows: [
    'none',
    '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    '0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
    '0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)',
    '0 14px 28px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.10)',
    '0 18px 36px rgba(0,0,0,0.15), 0 7px 14px rgba(0,0,0,0.10)',
    '0 24px 48px rgba(0,0,0,0.15), 0 10px 20px rgba(0,0,0,0.10)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 4,
          transition: 'all 0.2s ease-in-out',
          '&:active': {
            transform: 'translateY(2px)',
          },
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          border: '2px solid #1A1A1D',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#2E8B8B',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#D4A017',
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
  },
});

export default retroTheme;
