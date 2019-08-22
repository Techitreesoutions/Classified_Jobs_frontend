import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { createTheme } from "./theme/Theme";

import { configureStore } from "./store/Store";

//https://www.npmjs.com/package/bad-words

// Get the redux store
const { store } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={createTheme()}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
