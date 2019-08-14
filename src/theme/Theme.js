import { createMuiTheme } from "@material-ui/core/styles";

/**
 * The Theme class overrides the default theme from Material UI
 *
 * The variable velow represents all of our overrides.
 *
 * A full list of variables that can be overriden can be found here and in ./MaterialDefaults.json
 * https://material-ui-next.com/customization/themes/#the-other-variables
 *  contrastText
 */
let defaultTheme = {
  body: {
    backgroundColor: "#f2f2f2"
  },
  palette: {
    body: {
      backgroundColor: "#f2f2f2"
    },
    primary: {
      light: "#fff",
      main: "#75479C",
      dark: "#EA8969",
      contrastText: "#ffffff"
    },
    secondary: {
      light: "#c1cfdd",
      main: "#edf1f5",
      dark: "#395066",
      contrastText: "#fff"
    },
    contrast: {
      light: "#fafafa",
      main: "#AAAAAA",
      text: "#616161",
      contrastText: "#fff"
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff"
    },
    border: "1px solid rgba(224, 224, 224, 0.5)"
  },

  typography: {
    fontFamily: '"Roboto","Nunito Sans", "Helvetica", "Arial", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    color: "#9d2e6a"
  },
  overrides: {
    body: {
      backgroundColor: "#f2f2f2"
    },
    MuiButton: {
      root: {
        textTransform: "none",
        borderRadius: 30
      }
    },
    MuiIconButton: {
      root: {
        borderRadius: 0
      }
    },
    MuiStepper: {
      root: {
        padding: 0
      }
    }
  }
};

export const createTheme = theme => {
  if (theme === {} || theme === undefined) {
    return createMuiTheme(defaultTheme);
  }
  return createMuiTheme(theme);
};
