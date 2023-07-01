import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useEditEmployeeMutation } from "../Redux/Services/employeesApiSlice";
import { isEqual, _ } from "lodash";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(item, employeeSkills, theme) {
  var fontWeight;
  var hover;

  

  if (employeeSkills.some((skill) => isEqual(skill, item))) {
    fontWeight = theme.typography.fontWeightMedium;
  } else {
    fontWeight = theme.typography.fontWeightRegular;
  }

  return {
    fontWeight: fontWeight,
  };
}

const today = dayjs();

const validationSchemaEditEmployee = yup.object({
  firstName: yup.string("Enter first name").required("First name is required"),
  lastName: yup.string("Enter last name").required("Last name is required"),
  dob: yup.date().nonNullable("Cant be empty").typeError("Invalid Date"),
  email: yup.string().required("Email is required").email(),
  isActive: yup.boolean().required(),
});

export default function EditEmployee({ employeeDetails, skillLevelsToSelect }) {
  const theme = useTheme();

  const [employeesSkills, setEmployeesSkills] = useState(
    employeeDetails.skillLevels
  );

  const handleMenuItemSelect = (item) => {
    if (employeesSkills.some((skill) => isEqual(skill, item))) {
      setEmployeesSkills(
        employeesSkills.filter((value) => {
          return !isEqual(value, item);
        })
      );
    } else {
      setEmployeesSkills([...employeesSkills, item]);
    }
  };

  const [editEmployee, { data, isError, isLoading, isSuccess, error }] =
    useEditEmployeeMutation();

  // reset form if successfull
  React.useEffect(() => {
    formikEditEmployee.resetForm();
  }, [isSuccess]);

  const menuItemStyle = {
    "&.Mui-selected": {
      color: "green",
    },
    "&:hover": {
      backgroundColor: "lightblue",
    },
  };

  const formikEditEmployee = useFormik({
    initialValues: {
      firstName: employeeDetails.firstName,
      lastName: employeeDetails.lastName,
      dob: employeeDetails.dob,
      email: employeeDetails.email,
      skillLevels: employeeDetails.skillLevels,
      isActive: employeeDetails.isActive,
    },
    validationSchema: validationSchemaEditEmployee,
    onSubmit: async (values) => {
      const editEmployeePayload = {
        firstName: values.firstName,
        lastName: values.lastName,
        dob: values.dob,
        email: values.email,
        skillLevelIds: employeesSkills.map((obj) => obj.id),
        isActive: values.isActive,
      };

      try {
        var employeeData = await editEmployee(editEmployeePayload)
          .unwrap()
          .then((result) => {
            console.log(result);
          });
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <Grid container justifyContent={"center"} spacing={2}>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h4>Edit Employee</h4>
          {/* Form Start */}

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={formikEditEmployee.handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  variant="filled"
                  fullWidth
                  id="firstName"
                  type="text"
                  name="firstName"
                  label="First Name"
                  value={formikEditEmployee.values.firstName}
                  onChange={formikEditEmployee.handleChange}
                  error={
                    formikEditEmployee.touched.firstName &&
                    Boolean(formikEditEmployee.errors.firstName)
                  }
                  helperText={
                    formikEditEmployee.touched.firstName &&
                    formikEditEmployee.errors.firstName
                  }
                />

                <TextField
                  variant="filled"
                  fullWidth
                  id="lastName"
                  type="text"
                  name="lastName"
                  label="Last Name"
                  value={formikEditEmployee.values.lastName}
                  onChange={formikEditEmployee.handleChange}
                  error={
                    formikEditEmployee.touched.lastName &&
                    Boolean(formikEditEmployee.errors.lastName)
                  }
                  helperText={
                    formikEditEmployee.touched.lastName &&
                    formikEditEmployee.errors.lastName
                  }
                />

                <DatePicker
                  inputFormat="DD/MM/YYYY"
                  label="Date of birth"
                  views={["year", "month", "day"]}
                  value={formikEditEmployee.values.dob}
                  onChange={(value) =>
                    formikEditEmployee.setFieldValue("dob", value)
                  }
                  renderInput={(params) => (
                    <TextField
                      variant="filled"
                      fullWidth
                      {...params}
                      error={
                        formikEditEmployee.touched.dob &&
                        Boolean(formikEditEmployee.errors.dob)
                      }
                      helperText={
                        formikEditEmployee.touched.dob &&
                        formikEditEmployee.errors.dob
                      }
                    />
                  )}
                />

                <TextField
                  variant="filled"
                  fullWidth
                  id="email"
                  type="email"
                  name="email"
                  label="Employee email address"
                  value={formikEditEmployee.values.email}
                  onChange={formikEditEmployee.handleChange}
                  error={
                    formikEditEmployee.touched.email &&
                    Boolean(formikEditEmployee.errors.email)
                  }
                  helperText={
                    formikEditEmployee.touched.email &&
                    formikEditEmployee.errors.email
                  }
                />

                <FormControl sx={{ m: 1 }}>
                  <InputLabel id="selectSkillsLabel">Skills</InputLabel>
                  <Select
                    labelId="selectSkillsLabel"
                    id="selectSkills"
                    multiple
                    value={employeesSkills}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {selected.map((value) => (
                          <Chip key={value.id} label={value.name} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {skillLevelsToSelect.map((item) => (
                      <MenuItem
                        key={item.id}
                        value={item}
                        onClick={() => handleMenuItemSelect(item)}
                        style={getStyles(item, employeesSkills, theme)}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControlLabel
                  value={"start"}
                  control={
                    <Switch
                      id="isActive"
                      defaultChecked
                      value={formikEditEmployee.values.isActive}
                      onChange={formikEditEmployee.handleChange}
                    />
                  }
                  label="Active"
                />

                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  // disabled={isLoading}
                  type="submit"
                >
                  Submit
                </Button>
              </Stack>
            </form>
          </LocalizationProvider>
          {/* Form End */}
        </Paper>
      </Grid>
    </Grid>
  );
}
