import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ListItem } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { logOut } from "../Redux/Services/authSlice";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../Redux/Services/authApiSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCurrentUser } from "../Redux/Services/authSlice";
import { SnackbarContext } from "../Providers/SnackbarContext";

export default function ListItems() {
  const dispatch = useDispatch();

  const user = useSelector(selectCurrentUser);

  const { showSnackbar } = React.useContext(SnackbarContext);

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    await logout()
      .unwrap()
      .then((result) => {
        dispatch(logOut());

        showSnackbar(`Bye Bye ${user}!`);
      })
      .catch((error) => {
        showSnackbar(`${error.data}`);
      });
  };

  return (
    <>
      <ListItem
        sx={{ paddingLeft: "6px" }}
        button={true}
        component={Link}
        to="/dashboard/employees"
      >
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Employees" />
        </ListItemButton>
      </ListItem>

      <ListItem
        sx={{ paddingLeft: "6px" }}
        button={true}
        onClick={() => handleLogout()}
      >
        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </ListItem>
    </>
  );
}
