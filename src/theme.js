// import { createMuiTheme } from '@material-ui/core/styles';
// import { red } from '@material-ui/core/colors';

// // Create a theme instance.
// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: '#556cd6',
//     },
//     secondary: {
//       main: '#19857b',
//     },
//     error: {
//       main: red.A400,
//     },
//     background: {
//       default: '#fff',
//     },
//   },
// });

// export default theme;


import {createMuiTheme} from '@material-ui/core/styles';

let theme = createMuiTheme({
    palette: {
        primary: {
            light: '#FBCBD7',
            main: '#F03D5F',
            dark: '#B9223F',
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
            fontSize: 33,
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
            fontSize: 18,
            fontWeight: '600',
            letterSpacing: 'normal',
            lineHeight: '24px',
            fontStyle: 'normal',
            '@media (max-width:1050px)': {
                fontSize: 17,
                lineHeight: '20px',
            },
            '@media (max-width:900px)': {
                fontSize: 17,
                lineHeight: '22px',
                letterSpacing: '0.5px',
            },
            '@media (max-width:500px)': {
                fontSize: 17,
                lineHeight: '24px',
            },
        },
        h4: {
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '1px',
        },
        h5: {
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: 1.5,
        },
        body1: {
            fontSize: 14,
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
                fontSize: 17,
            },
            '@media (max-width:900px)': {
                fontSize: 16,
                lineHeight: '15px',
            },
            '@media (max-width:500px)': {
                fontSize: 15,
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
        borderRadius: 5,
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
        MuiInputBase: {
            input: {
                height: 18,
                backgroundColor: '#EEF0F5',
                borderRadius: '5px',
                fontSize: 14,
            }
        },
        MuiOutlinedInput: {
            notchedOutline: {
                height: 18,
                border: 'none',
                borderColor: 'transparent',
            }
        },
        MuiButton: {
            outlined: {
                height: '50px',
                border: '1.5px solid',
                backgroundColor: "#ffffff",
                [theme.breakpoints.down('sm')]: {
                    height: '40px'
                }
            },
            contained: {
                height: '50px',
                fontWeight: 'bold',
                [theme.breakpoints.down('sm')]: {
                    height: '40px'
                }
            }
        },
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
