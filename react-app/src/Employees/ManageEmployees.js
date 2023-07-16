import * as React from "react";
import { Grid } from "@mui/material";
import Employees from "./Employees";
import Title from "../Common/Title";
import AddEmployee from "./AddEmployee";
import { useGetAllSkillLevelsQuery } from "../Redux/Services/skillLevelsApiSlice";
import CustomError from "../Common/CustomError";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

export default function ManageEmployees() {
  const {
    data: skillLevels = [],
    isSuccess: isSuccessSkillLevels,
    isError: isErrorSkillLevels,
    refetch,
  } = useGetAllSkillLevelsQuery();

  const refetchData = () => {
    refetch();
  };

  return (
    <>
      <Title>Manage Employees</Title>
      {isErrorSkillLevels && (
        <CustomError
          message={"Error loading data. Please try again soon or refetch data."}
          icon={<ReportProblemIcon />}
          iconColor={"error"}
          refetchButton={true}
          refetchData={refetchData}
        />
      )}

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
