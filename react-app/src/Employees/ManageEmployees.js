import * as React from "react";
import { Stack } from "@mui/system";
import { Divider } from "@mui/material";
import Employees from "./Employees";
import Title from "../Common/Title";

export default function ManageEmployees() {
  return (
    <>
      <Title>Manage Employees</Title>
      <Stack
        spacing={2}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        <Employees />
      </Stack>
    </>
  );
}