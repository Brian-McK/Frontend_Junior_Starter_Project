import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridActionsCellItem,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDialog } from "../Providers/DialogContext";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import {
  useGetAllEmployeesQuery,
  useDeleteEmployeeMutation,
} from "../Redux/Services/employeesApiSlice";
import EditFormDialog from "../Common/EditFormDialog";
import { SnackbarContext } from "../Providers/SnackbarContext";
import { useNavigate } from "react-router-dom";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import CustomError from "../Common/CustomError";
import LinearProgress from "@mui/material/LinearProgress";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{ display: "flex", padding: "24px" }}>
      <GridToolbarFilterButton />
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
      <GridToolbarQuickFilter sx={{ marginLeft: "auto" }} />
    </GridToolbarContainer>
  );
}

function CustomNoRowsOverlay() {
  return (
    <Grid container spacing={2} justifyContent={"center"}>
      <Grid item>
        <Typography variant="h5">
          No employee data available <SentimentVeryDissatisfiedIcon />
        </Typography>
      </Grid>
    </Grid>
  );
}

export default function Employees({ skillLevelsToSelect }) {
  const showDialog = useDialog();

  const navigate = useNavigate();

  const { showSnackbar } = React.useContext(SnackbarContext);

  const [open, setOpen] = React.useState(false);

  const [employeeData, setEmployeeData] = React.useState(false);

  const {
    data: employees,
    isLoading,
    isSuccess,
    isFetching,
    isUninitialized,
    isError,
  } = useGetAllEmployeesQuery();

  const [deleteEmployee, result] = useDeleteEmployeeMutation();

  const handleViewEmployeeSkillLevelsOpenDialog = async (params) => {
    const { skillLevelIds } = params.row;

    const mappedSkillLevels = skillLevelIds.map((skillLevelId) => {
      const skillLevel = skillLevelsToSelect.find(
        (sl) => sl.id === skillLevelId.toString()
      );

      if (skillLevel) {
        return {
          id: skillLevel.id,
          primary: skillLevel.name,
          secondary: skillLevel.description,
        };
      }

      return {};
    });

    await showDialog({
      title: `Employee Skills: ${params.row.firstName} ${params.row.lastName}`,
      displayOkButton: true,
      displayList: mappedSkillLevels,
    });
  };

  const handleEditEmployeeOpenDialog = async (params) => {
    const userData = params.row;

    setEmployeeData(userData);

    setOpen(true);
  };

  const handleConfirmDeleteEmployee = async (params) => {
    const confirmed = await showDialog({
      title: `Employee: ${params.row.firstName} ${params.row.lastName}`,
      message: `Are you sure you want to delete ${params.row.firstName}?`,
    });
    if (confirmed) {
      try {
        await deleteEmployee(params.id)
          .unwrap()
          .then((result) => {
            showSnackbar(`Successfully Deleted!`, "green");
          });
      } catch (error) {
        if (error.status === 401) {
          localStorage.clear();

          navigate("/login");

          showSnackbar(`Unauthorized Access, You have been logged out!`, "red");
        }
      }
    }
  };

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const dataGridDataCols = [
    {
      field: "firstName",
      headerName: "First Name",
      description: "The first name of the employee",
      width: 150,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      description: "The last name of the employee",
      width: 150,
    },
    {
      field: "dob",
      headerName: "Date of birth",
      description: "The date of birth of the employee",
      width: 150,
      valueGetter: (params) => `${dayjs(params.row.Dob).format("DD/MM/YYYY")}`,
    },
    {
      field: "age",
      headerName: "Age",
      description: "The Age of the employee",
      width: 50,
    },
    {
      field: "email",
      headerName: "Email",
      description: "The email address of the employee",
      width: 200,
    },
    {
      field: "isActive",
      headerName: "Active",
      description: "Shows wether the employee is active or not",
      width: 70,
      valueGetter: (params) => {
        if (params.row.isActive) {
          return `Yes`;
        }
        return `No`;
      },
    },
    {
      field: "view skills",
      description: "View skill levlels",
      type: "actions",
      headerName: "View Skills",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          disabled={isEmptyObject(params.row.skillLevelIds)}
          icon={
            isEmptyObject(params.row.skillLevelIds) ? (
              <PsychologyIcon sx={{ color: "grey" }} />
            ) : (
              <PsychologyIcon sx={{ color: "#2c8535" }} />
            )
          }
          label="View skill levels"
          onClick={() => handleViewEmployeeSkillLevelsOpenDialog(params)}
        />,
      ],
    },
    {
      field: "actions",
      description:
        "View skill levlels, edit employee details or delete employee",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon sx={{ color: "#2c8535" }} />}
          label="Edit employee details"
          onClick={() => handleEditEmployeeOpenDialog(params)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon sx={{ color: "#d44848" }} />}
          label="Delete employee"
          onClick={() => handleConfirmDeleteEmployee(params)}
        />,
      ],
    },
  ];

  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h4>Employees</h4>
            {/* Table Start */}
            <Box sx={{ maxHeight: 500, width: "100%" }}>
              
              {isError && (
                <>
                  <CustomError
                    message={`
                      Error fetching the employee data. Please try again soon!
                    `}
                    icon={<ReportProblemIcon />}
                    iconColor={"error"}
                  />
                </>
              )}

              {isFetching && (
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  <CustomError
                    message={"Loading in progress..."}
                    icon={<HourglassBottomIcon />}
                    iconColor={"black"}
                  />
                  <LinearProgress />
                </Box>
              )}

              <DataGrid
                loading={isLoading}
                rows={employees ?? []}
                getRowId={(row) => row.id}
                columns={dataGridDataCols}
                autoHeight
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                slots={{
                  toolbar: CustomToolbar,
                  noRowsOverlay: CustomNoRowsOverlay,
                }}
                experimentalFeatures={{ newEditingApi: true }}
              />
            </Box>
            {/* Table End */}
          </Paper>
        </Grid>
      </Grid>

      <EditFormDialog
        open={open}
        setOpen={setOpen}
        employeeData={employeeData}
        skillLevelsToSelect={skillLevelsToSelect}
      />
    </>
  );
}
