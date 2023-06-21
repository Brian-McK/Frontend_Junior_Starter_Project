import * as React from "react";
// import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListIcon from '@mui/icons-material/List';
// import { Link } from "react-router-dom";
import { ListItem } from "@mui/material";
// import { useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../providers/Auth.context";
// import { useLogoutEmployeeMutation } from "../api/services/employees";
// import { SharedSnackbarContext } from "../providers/SharedSnackbar.context";
// import { useDialog } from "../providers/Dialog.context";

export default function ListItems() {
  //   const { user, setUser } = useAuth();
  //   const navigate = useNavigate();
  //   const showDialog = useDialog();
  //   const snackBarContext = React.useContext(SharedSnackbarContext);

  //   const [logoutEmployee, { data, status, isLoading }] =
  //     useLogoutEmployeeMutation();

  //   const handleConfirmLogout = async (e) => {
  //     e.preventDefault();

  //     const userId = {
  //       id: user.id,
  //     };

  //     const confirmed = await showDialog({
  //       title: `Logout`,
  //       message: `Are you sure you want to logout ${user.name}?`,
  //     });
  //     if (confirmed) {
  //       logoutEmployee(userId)
  //         .unwrap()
  //         .then((data) => {
  //           if (data.isLoggedIn == false) {
  //             setUser(null);
  //             navigate("/");
  //             snackBarContext.openSnackbar(`Bye bye, Logged out successfully!`);
  //           }
  //         })
  //         .catch((error) => {
  //           snackBarContext.openSnackbar(
  //             `Ooops, something went wrong with logging out!`
  //           );
  //         });
  //     }
  //   };

  return (
    <>
      <ListItem
        sx={{ paddingLeft: "6px" }}
        button={true}
        to="/dashboard/overview"
      >
        <ListItemButton>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="Employees" />
        </ListItemButton>
      </ListItem>

      {/* <ListItem
        sx={{ paddingLeft: "6px" }}
        button={true}
        onClick={handleConfirmLogout}
      >
        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </ListItem>  */}

    </>
  );
}