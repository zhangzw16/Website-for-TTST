import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#63ccff',
      main: '#d6206B',
      dark: '#006db3',
      contrastText: '#fff',
    },
  },
  shape: {
    borderRadius: 8,
  },
  overrides: {
    MuiDrawer: {
      paper: {
        minWidth: 256,
      },
      paperAnchorDockedLeft: {
        borderRight: 'none',
      },
    },
  },
});

export default theme;