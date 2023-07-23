import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ListItem } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../Redux/Services/authApiSlice";
import { SnackbarContext } from "../Providers/SnackbarContext";
import { setCredentials } from "../Redux/Services/authSlice";
import { useDispatch } from "react-redux";

export default function ListItems() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = localStorage.getItem("username");

  const { showSnackbar } = React.useContext(SnackbarContext);

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    await logout()
      .unwrap()
      .then((result) => {

        dispatch(logout());

        localStorage.clear();

        navigate("/");

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
