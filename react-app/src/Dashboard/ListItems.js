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

export default function ListItems() {
  const dispatch = useDispatch();

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
        onClick={() => dispatch(logOut())}
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
