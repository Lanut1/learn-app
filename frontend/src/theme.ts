import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    muted?: string;
  }

  interface Palette {
    tertiary?: Palette['primary'];
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    fontFamilySecondary: React.CSSProperties['fontFamily'];
  }

  interface TypographyVariantsOptions {
    fontFamilySecondary?: React.CSSProperties['fontFamily'];
  }

  interface TypographyVariantsOverrides {
    fontFamilySecondary: true;
  }
}

const fonts = {
  heading: [
    'Montserrat',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ].join(','),
  body: [
    'Poppins',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ].join(','),
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#6355D8FF', // Indigo
      light: '#818cf8',
      dark: '#4D3ED3FF',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f59e0b', // Amber
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ef4444', // Red
      light: '#f87171',
      dark: '#dc2626',
    },
    warning: {
      main: '#f97316', // Orange
      light: '#fb923c',
      dark: '#ea580c',
    },
    info: {
      main: '#3b82f6', // Blue
      light: '#60a5fa',
      dark: '#2563eb',
    },
    success: {
      main: '#10b981', // Green
      light: '#34d399',
      dark: '#059669',
    },
    background: {
      default: '#FAFAFBFF',
      paper: '#ffffff',
      muted: '#DEE1E6',
    },
    text: {
      primary: '#171A1F',
      secondary: '#6b7280',
      disabled: '#9ca3af',
    },
  },
  typography: {
    fontFamily: fonts.heading,
    fontFamilySecondary: fonts.body,
    h1: {
      fontSize: '3.5rem',
      lineHeight: '4.875rem',
      fontWeight: 700,
      color: '#171A1F',
    },
    h2: {
      fontSize: '3rem',
      lineHeight: '4.25rem',
      fontWeight: 700,
      color: '#171A1F',
    },
    h3: {
      fontSize: '2rem',
      lineHeight: '3rem',
      fontWeight: 700,
      color: '#171A1F',
    },
    h4: {
      fontSize: '1.25rem',
      lineHeight: '1.875rem',
      color: '#171A1F',
      fontWeight: 700,
    },
    h5: {
      fontSize: '1.125rem',
      lineHeight: '1.875rem',
      color: '#171A1F',
      fontWeight: 400,
      fontFamily: fonts.body
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1.25rem',
      lineHeight: '1.875rem',
      fontFamily: fonts.body,
      fontWeight: 600,
      color: '#6b7280'
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: '1.375rem',
      fontFamily: fonts.body,
      fontWeight: 600,
      color: '#6b7280'
    },
    subtitle1: {
      fontSize: '1.125rem',
      lineHeight: '1.75rem',
      fontFamily: fonts.body,
      fontWeight: 400,
      color: '#6b7280'
    },
    button: {
      fontFamily: fonts.body,
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap');
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#4D3ED3FF',
          },
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: '#d97706',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'medium',
        fullWidth: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
          borderRadius: '0.5rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: '0.5rem',
        },
      },
    },
  },
});

export default theme;
