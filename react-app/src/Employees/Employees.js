import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
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
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useDialog } from "../Providers/DialogContext";
import { useGetAllEmployeesQuery, useDeleteEmployeeMutation } from "../Redux/Services/EmployeeSkillLevelService";

function CustomToolbar() {
    return (
        <GridToolbarContainer sx={{ display: "flex", padding: "24px" }}>
            <GridToolbarFilterButton />
            <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
            <GridToolbarQuickFilter sx={{ marginLeft: "auto" }} />
        </GridToolbarContainer>
    );
}

export default function Employees() {

    const showDialog = useDialog();

    const {
        data = [],
        isLoading,
        isSuccess,
    } = useGetAllEmployeesQuery();

    console.log(data);

    const [deleteEmployee, deleteEmployeeResult] = useDeleteEmployeeMutation();

    const handleViewEmployeeSkillLevelsOpenDialog = async (params) => {
        const confirmed = await showDialog({
            title: `${"Edit Employee Details"}`,
            message: `${"Message goes here"}`,
        });
    };

    const handleEditEmployeeOpenDialog = async (params) => {
        const confirmed = await showDialog({
            title: `${"Edit Employee Details"}`,
            message: `${"Message goes here"}`,
        });
    };

    const handleConfirmDeleteEmployee = async (params) => {

        const confirmed = await showDialog({
            title: `Employee: ${params.row.firstName} ${params.row.lastName}`,
            message: `Are you sure you want to delete ${params.row.firstName}?`,
        });
        if (confirmed) {
            deleteEmployee(params.id);
        }

        console.log(deleteEmployeeResult);
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
            valueGetter: (params) =>
                `${dayjs(params.row.Dob).format("DD/MM/YYYY")}`,
        },
        {
            field: "age",
            headerName: "Age",
            description: "The Age of the employee",
            width: 150,
        },
        {
            field: "email",
            headerName: "Email",
            description: "The email address of the employee",
            width: 150,
        },
        {
            field: "ssActive",
            headerName: "Active",
            description: "Shows wether the employee is active or not",
            width: 100,
            valueGetter: (params) => {
                if (params.row.IsActive) {
                    return `No`;
                }
                return `Yes`;
            },
        },
        {
            field: "actions",
            description: "View skill levlels, edit employee details or delete employee",
            type: "actions",
            headerName: "Actions",
            width: 100,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<RemoveRedEyeIcon sx={{ color: "#2c8535" }} />}
                    label="View skill levels"
                    onClick={() => handleViewEmployeeSkillLevelsOpenDialog(params)}
                />,
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
                        <Box sx={{ height: 500, width: "100%" }}>
                            {isSuccess && (
                                <DataGrid
                                    loading={isLoading}
                                    rows={data}
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
                                    slots={{ toolbar: CustomToolbar }}
                                    experimentalFeatures={{ newEditingApi: true }}
                                />
                            )}
                        </Box>
                        {/* Table End */}
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}