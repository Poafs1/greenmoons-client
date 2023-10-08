import { createTheme } from '@mui/material';
import { green, grey, red } from '@mui/material/colors';

export const theme = createTheme({
  typography: {
    h1: {
      fontSize: '32px',
      fontWeight: 700,
      color: '#2D2D2D',
    },
    h2: {
      fontSize: '28px',
      fontWeight: 700,
      color: '#2D2D2D',
    },
    h3: {
      fontSize: '24px',
      fontWeight: 700,
      color: '#2D2D2D',
    },
    body1: {
      fontSize: '16px',
      fontWeight: 400,
      color: '#343450',
    },
    body2: {
      fontSize: '14px',
      fontWeight: 400,
      color: '#343450',
    },
    caption: {
      fontSize: '12px',
      fontWeight: 400,
      color: '#667085',
    },
  },
  spacing: 4,
  palette: {
    primary: {
      main: green['500'],
      contrastText: '#fff',
    },
    secondary: grey,
    error: {
      main: red['700'],
    },
  },
  shape: {
    borderRadius: 6,
  },
});
