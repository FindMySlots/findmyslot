import { createMuiTheme } from '@material-ui/core/styles';

import COLORS from './colors';

export const typography = {
  fontFamily:
      'Comfortaa, Fira Mono, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  fontSize: 13,
  color: COLORS.skyBlue,
};

export const zIndex9 = 9;
export const zIndex99 = 99;
export const zIndex999 = 999;
export const zIndex9999 = 9999;

const overrides = {
  MuiTable: {
    root: {
      marginBottom: 90,
    },
  },
  MuiTableCell: {
    root: {
      fontSize: 13,
      color: COLORS.fontBlack,
      borderBottom: `1px dashed ${COLORS.lightGray2}`,
      lineHeight: '16px',
      height: '46px',
    },
    head: {
      fontSize: 16,
      color: COLORS.black,
      borderBottom: `1px solid ${COLORS.lightGray2}`,
      lineHeight: '20px',
      padding: '8px !important',
      'text-transform': 'uppercase !important',
      verticalAlign: 'bottom',
    },
    sizeSmall: {
      padding: 8,
    },
  },
  MuiTableRow: {
    root: {
      '&:hover': {
        background: `${COLORS.lightGray2RBA} !important`,
      },
      '&:last-child ': {
        borderBottom: `2px solid ${COLORS.lightGray2}`,
      },
      minHeight: 38,
    },
    head: {
      '&:hover': {
        background: 'unset !important',
      },
    },
  },
  MuiTooltip: {
    tooltip: {
      fontSize: 13,
      color: COLORS.white,
      backgroundColor: COLORS.black,
    },
  },
  MuiDialog: {
    container: {
      alignItems: 'flex-start',
    },
    paper: {
      borderLeft: `10px solid ${COLORS.violet}`,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      marginTop: 182,
      paddingLeft: 8,
    },
  },
  MuiDialogTitle: {
    root: {
      fontSize: 12,
      color: COLORS.lightGray,
    },
  },
  MuiDialogContentText: {
    root: {
      color: COLORS.deepGray,
      maxWidth: 350,
      fontSize: 16,
    },
  },
  MuiDialogActions: {
    root: {
      justifyContent: 'flex-start',
    },
  },
  MuiAlert: {
    filledError: {
      backgroundColor: COLORS.violet,
    },
    error: {
      backgroundColor: COLORS.violet15,
    },
  },
  MuiBreadcrumbs: {
    li: {
      position: 'relative' as 'relative',
    },
  },
  MuiCardContent: {
    root: {
      paddingLeft: 20,
      paddingTop: 12,
      paddingBottom: 6,
      paddingRight: 20,
    },
  },
  MuiCardActions: {
    root: {
      flexDirection: 'column' as 'column',
      display: 'flex',
      width: '100%',
      alignItems: 'flex-start',
      paddingLeft: 20,
      paddingTop: 0,
      paddingBottom: 12,
      paddingRight: 20,
    },
  },
  MuiTypography: {
    h6: {
      fontWeight: 'normal' as 'normal',
    },
  },
  MuiAutocomplete: {
    input: {
      '&.Mui-focused': {
        border: `1px solid ${COLORS.violet}`,
      },
    },
  },
  MuiInputAdornment: {
    positionEnd: {
      marginLeft: 0,
    },
  },
  MuiInputBase: {
    root: {
      fontSize: 13,
    },
  },
};

const theme = createMuiTheme({
  overrides,
  typography,
  palette: {
    background: {
      default: COLORS.background,
    },
    primary: {
      main: COLORS.skyBlue,
      light: COLORS.skyBlue,
    },
    secondary: {
      main: COLORS.violet,
      light: COLORS.violet15,
      dark: COLORS.brightViolet,
    },
  },
});

export default theme;
