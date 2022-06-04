import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

export const color = {
  primary: "#1BAA56",
  secondary: "#FEC53C",
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: color.primary,
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: color.secondary,
      contrastText: "#FFFFFF",
    },
  },
});

export default function ThemeProvider(props) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </MuiThemeProvider>
  );
}
