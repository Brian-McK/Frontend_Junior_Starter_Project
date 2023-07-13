import * as React from "react";
import { Grid } from "@mui/material";
import Employees from "./Employees";
import Title from "../Common/Title";
import AddEmployee from "./AddEmployee";
import { useGetAllSkillLevelsQuery } from "../Redux/Services/skillLevelsApiSlice";

export default function ManageEmployees() {
  const {
    data: skillLevels = [],
    isLoading: isLoadingSkillLevels,
    isSuccess: isSuccessSkillLevels,
    isError: isErrorSkillLevels,
    error: skillLevelsError,
  } = useGetAllSkillLevelsQuery();

  return (
    <>
      <Title>Manage Employees</Title>
      {isSuccessSkillLevels && (
        <Grid container spacing={3} justifyContent={"center"}>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <AddEmployee skillLevelsToSelect={skillLevels} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={8}>
            <Employees skillLevelsToSelect={skillLevels} />
          </Grid>
        </Grid>
      )}
    </>
  );
}
