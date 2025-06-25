import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function list(theme: Theme) {
  return {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2),
        },
      },
    },
    MuiListItemAvatar: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
          marginRight: theme.spacing(2),
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          margin: 0,
        },
        multiline: {
          margin: 0,
        },
        primary: {
          fontSize: theme.typography.caption.fontSize,
          color: theme.palette.text.secondary,
        },
        secondary: {
          fontSize: theme.typography.subtitle2.fontSize,
          fontWeight: theme.typography.fontWeightBold,
          color: theme.palette.text.primary,
        },
      },
    },
  };
}
