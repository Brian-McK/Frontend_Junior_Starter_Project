import * as React from "react";
import { Grid } from "@mui/material";
import Employees from "./Employees";
import Title from "../Common/Title";
import AddEmployee from "./AddEmployee";

export default function ManageEmployees() {
  return (
    <>
      <Title>Manage Employees</Title>
      <Grid container spacing={3} justifyContent={"center"}>
        <Grid item xs={12} sm={12} md={3}>
          <AddEmployee />
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          <Employees />
        </Grid>
      </Grid>
    </>
  );
}
