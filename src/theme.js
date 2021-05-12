import { createMuiTheme } from '@material-ui/core/styles';

let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#9D97FF',
      main: '#F03D5F',
      dark: '#6157Ff',
    },
    secondary: {
      light: '#96FFCC',
      main: '#69F0AE',
      dark: '#35DD8B'
    },
    background: {
      default: '#ffffff'
    },
  },
  typography: {
    fontFamily: 'poppins',
    h1: {
      fontSize: 50,
      fontWeight: 'bold',
      letterSpacing: '-0.2px',
      lineHeight: '52px',
      fontStyle: 'normal',
      '@media (max-width:1050px)': {
        fontSize: 33,
        lineHeight: '40px',
      },
      '@media (max-width:900px)': {
        fontSize: 24,
        lineHeight: '30px',
      },
    },
    h2: {
      fontSize: 36,
      fontWeight: 'bold',
      letterSpacing: 0.3
    },
    h3: {
      fontSize: 22,
      fontWeight: '600',
      letterSpacing: 'normal',
      lineHeight: '24px',
      fontStyle: 'normal',
      '@media (max-width:1050px)': {
        fontSize: 16,
        lineHeight: '20px',
      },
      '@media (max-width:900px)': {
        fontSize: 12,
        lineHeight: '16px',
        letterSpacing: '0.5px',
      },
      '@media (max-width:500px)': {
        fontSize: 11,
        lineHeight: '12px',
      },
    },
    h4: {
      fontSize: 12,
      fontWeight: 400,
      letterSpacing: '1px',
    },
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.7,
    },
    body1: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    body2: {
      fontWeight: 400,
      letterSpacing: '1px',
    },
    subtitle1: {
      fontSize: 18,
      fontWeight: 400,
      letterSpacing: '0.75px',
      lineHeight: '22px',
      '@media (max-width:1050px)': {
        fontSize: 15,
      },
      '@media (max-width:900px)': {
        fontSize: 13,
        lineHeight: '15px',
      },
      '@media (max-width:500px)': {
        fontSize: 12,
        lineHeight: '15px',
      },
    },
    subtitle2: {
      fontSize: 17,
      fontWeight: 600,
      letterSpacing: '0.45px',
      lineHeight: '22px',
      '@media (max-width:1050px)': {
        fontSize: 15,
      },
      '@media (max-width:900px)': {
        fontSize: 14,
        lineHeight: '15px',
      },
      '@media (max-width:500px)': {
        fontSize: 14,
        lineHeight: '15px',
      },
    },
    caption: {
      fontSize: 12,
      fontWeight: 400,
      letterSpacing: '1px',
    }
  },
  shape: {
    borderRadius: 16,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiInputBase:{
      input:{
        backgroundColor: '#EEF0F5',
        borderRadius: '5px',
        margin: '0 0 20px 0',
        [theme.breakpoints.down('xs')]:{
          margin: '0 0 10px 0'
        }
      }
    },
    MuiOutlinedInput:{
      notchedOutline:{
        border: 'none',
        borderColor: 'transparent',
        margin: '0 0 20px 0',
        [theme.breakpoints.down('xs')]:{
          margin: '0 0 10px 0'
        }
      }
    }
  }
}

// theme = {
//   ...theme,
//   overrides: {
//     MuiDrawer: {
//       paper: {
//         // backgroundColor: '#18202c',
//       },
//     },
//     MuiButton: {
//       label: {
//         textTransform: 'none',
//       },
//       contained: {
//         boxShadow: 'none',
//         '&:active': {
//           boxShadow: 'none',
//         },
//       },
//     },
//     MuiTabs: {
//       root: {
//         marginLeft: theme.spacing(1),
//       },
//       indicator: {
//         height: 3,
//         borderTopLeftRadius: 3,
//         borderTopRightRadius: 3,
//         backgroundColor: theme.palette.common.white,
//       },
//     },
//     MuiTab: {
//       root: {
//         textTransform: 'none',
//         margin: '0 16px',
//         minWidth: 0,
//         padding: 0,
//         [theme.breakpoints.up('md')]: {
//           padding: 0,
//           minWidth: 0,
//         },
//       },
//     },
//     MuiIconButton: {
//       root: {
//         padding: theme.spacing(1),
//       },
//     },
//     MuiTooltip: {
//       tooltip: {
//         borderRadius: 4,
//       },
//     },
//     MuiDivider: {
//       root: {
//         backgroundColor: '#404854',
//       },
//     },
//     MuiListItemText: {
//       primary: {
//         fontWeight: theme.typography.fontWeightMedium,
//       },
//     },
//     MuiListItemIcon: {
//       root: {
//         color: 'inherit',
//         marginRight: 0,
//         '& svg': {
//           fontSize: 20,
//         },
//       },
//     },
//     MuiAvatar: {
//       root: {
//         width: 32,
//         height: 32,
//       },
//     },
//     MuiChip: {
//       root: {

//       },
//     },
//     MuiStepConnector: {
//       vertical: {
//         marginLeft: '0',
//         padding: '0',
//       },

//     },
//     MuiStepLabel: {
//       iconContainer: {
//         paddingRight: 0,
//       },
//       label: {
//         color: 'rgba(0, 0, 0, 0.54)',
//         '&$active': {
//           color: '#5F2EEA',
//           marginTop: '3px'
//         },
//       },

//     },
//     MuiStep: {
//       horizontal: {
//         paddingRight: 0,
//         paddingLeft: 0
//       }
//     },
//     MuiTableHead: {
//       root: {
//         borderRadius: '16px',
//       }
//     }
//   },

// };

export default theme;
