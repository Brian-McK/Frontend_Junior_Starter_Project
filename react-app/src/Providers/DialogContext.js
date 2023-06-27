import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { createContext, useContext, useState } from "react";

const DialogContext = createContext();

const DialogProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState({
    title: "",
    message: "",
    displayList: [],
    displayOkButton: false,
  });

  const [promiseInfo, setPromiseInfo] = useState();

  const showDialog = (options) => {
    return new Promise((resolve, reject) => {
      setPromiseInfo({ resolve, reject });
      setOptions(options);
      setIsOpen(true);
    });
  };

  const handleConfirm = () => {
    setIsOpen(false);
    promiseInfo?.resolve(true);
    setPromiseInfo(undefined);
  };

  const handleCancel = () => {
    setIsOpen(false);
    promiseInfo?.resolve(false);
    setPromiseInfo(undefined);
  };

  return (
    <>
      <Dialog open={isOpen} onClose={handleCancel}>
        <DialogTitle>{options.title}</DialogTitle>
        <DialogContent dividers sx={{ minWidth: "400px" }}>
          {options.message && (
            <DialogContentText>{options.message}</DialogContentText>
          )}
          {options.displayList && (
            <Grid container spacing={2}>
              <Grid item>
                <List>
                  {options.displayList.map((item, index) => (
                    <>
                      <ListItem key={index}>
                        <ListItemText
                          primary={`${item.primary}` || null}
                          secondary={`${item.secondary}` || null}
                        />
                      </ListItem>
                      <Divider />
                    </>
                  ))}
                </List>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          {options.displayOkButton ? (
            <Button onClick={handleCancel}>Ok</Button>
          ) : (
            <>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button
                autoFocus
                color="primary"
                variant="contained"
                onClick={handleConfirm}
              >
                Confirm
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
      <DialogContext.Provider value={showDialog}>
        {children}
      </DialogContext.Provider>
    </>
  );
};

export const useDialog = () => {
  return useContext(DialogContext);
};

export default DialogProvider;
