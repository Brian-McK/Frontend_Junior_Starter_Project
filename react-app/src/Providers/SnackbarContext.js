import React, { createContext, useState } from "react";
import { Snackbar } from "@mui/material";

const SnackbarContext = createContext();

const SnackbarProvider = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("default");
  const [snackbarDuration, setSnackbarDuration] = useState(3000);

  const showSnackbar = (message, color = "default", snackbarDuration) => {
    setSnackbarMessage(message);
    setSnackbarColor(color);
    setSnackbarOpen(true);
    setSnackbarDuration(snackbarDuration);
  };

  const hideSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
      {children}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={snackbarDuration}
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
