import React, { createContext, useState } from "react";
import { Snackbar } from "@mui/material";

const SnackbarContext = createContext();

const SnackbarProvider = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("default");

  const showSnackbar = (message, color = "default") => {
    setSnackbarMessage(message);
    setSnackbarColor(color);
    setSnackbarOpen(true);
  };

  const hideSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
      {children}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={hideSnackbar}
        message={snackbarMessage}
        ContentProps={{
          sx: {
            background: snackbarColor
          }
        }}
      />
    </SnackbarContext.Provider>
  );
};

export { SnackbarContext, SnackbarProvider };
