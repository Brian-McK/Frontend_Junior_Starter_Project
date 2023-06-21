import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import theme from "./theme";
import { store } from "../src/Redux/Services/Store";
import { Provider } from "react-redux";
import DialogProvider from './Providers/DialogContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <DialogProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </DialogProvider>
  </Provider>
);