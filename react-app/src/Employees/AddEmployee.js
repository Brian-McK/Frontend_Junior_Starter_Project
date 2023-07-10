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
import { SnackbarContext } from "../Providers/SnackbarContext";

import { useAddEmployeeMutation } from "../Redux/Services/employeesApiSlice";

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

function getStyles(item, employeesSkills, theme) {
  return {
    fontWeight:
      employeesSkills.indexOf(item) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const today = dayjs();

const validationSchemaAddEmployee = yup.object({
  firstName: yup
    .string("Enter first name")
    .required("First name is required")
    .min(2, "First name should be at least 2 characters")
    .max(35, " First name should not exceed 35 characters")
    .matches(
      /^[a-zA-Z]+$/,
      "First name should only contain alphabetic characters"
    ),
  lastName: yup
    .string("Enter last name")
    .required("Last name is required")
    .min(2, "Last name should be at least 2 characters")
    .max(35, " Last name should not exceed 35 characters")
    .matches(
      /^[a-zA-Z]+$/,
      "Last name should only contain alphabetic characters"
    ),
  dob: yup
    .date()
    .nonNullable("Date of birth cant be empty")
    .typeError("Invalid Date")
    .test("is-at-least-18", "Must be at least 18 years old", (value) => {
      const currentDate = dayjs();
      const eighteenYearsAgo = currentDate.subtract(18, "year");
      return dayjs(value).isBefore(eighteenYearsAgo);
    }),
  email: yup.string().required("Email is required").email(),
  isActive: yup.boolean().required(),
});

export default function AddEmployee({ skillLevelsToSelect }) {
  const theme = useTheme();

  const { showSnackbar } = React.useContext(SnackbarContext);

  const [employeesSkills, setEmployeesSkills] = useState([]);

  const handleChangeSkillLevelSelect = (event) => {
    const {
      target: { value },
    } = event;

    setEmployeesSkills([...value]);
  };

  const [addEmployee, { data, isError, isLoading, isSuccess, error }] =
    useAddEmployeeMutation();

  // reset form if successfull
  React.useEffect(() => {
    formikAddEmployee.resetForm();
    setEmployeesSkills([]);
  }, [isSuccess]);

  const formikAddEmployee = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      dob: today.subtract(18, "year"),
      email: "",
      skillLevels: [],
      isActive: true,
    },
    validationSchema: validationSchemaAddEmployee,
    onSubmit: async (values) => {
      const addEmployeePayload = {
        firstName: values.firstName,
        lastName: values.lastName,
        dob: values.dob,
        email: values.email,
        skillLevelIds: employeesSkills.map((obj) => obj.id),
        isActive: values.isActive,
      };

      try {
        await addEmployee(addEmployeePayload)
          .unwrap()
          .then((result) => {
            showSnackbar(`Successfully Added!`, "green");
          });
      } catch (error) {
        showSnackbar(`${error.data}`, "red");
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
          <h4>Add Employee</h4>
          {/* Form Start */}

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={formikAddEmployee.handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  disabled={isLoading}
                  variant="filled"
                  fullWidth
                  id="firstName"
                  type="text"
                  name="firstName"
                  label="First Name"
                  value={formikAddEmployee.values.firstName}
                  onChange={formikAddEmployee.handleChange}
                  error={
                    formikAddEmployee.touched.firstName &&
                    Boolean(formikAddEmployee.errors.firstName)
                  }
                  helperText={
                    formikAddEmployee.touched.firstName &&
                    formikAddEmployee.errors.firstName
                  }
                />

                <TextField
                  disabled={isLoading}
                  variant="filled"
                  fullWidth
                  id="lastName"
                  type="text"
                  name="lastName"
                  label="Last Name"
                  value={formikAddEmployee.values.lastName}
                  onChange={formikAddEmployee.handleChange}
                  error={
                    formikAddEmployee.touched.lastName &&
                    Boolean(formikAddEmployee.errors.lastName)
                  }
                  helperText={
                    formikAddEmployee.touched.lastName &&
                    formikAddEmployee.errors.lastName
                  }
                />

                <DatePicker
                  disableFuture
                  maxDate={today.subtract(18, "year")}
                  disabled={isLoading}
                  inputFormat="DD/MM/YYYY"
                  label="Date of birth"
                  views={["year", "month", "day"]}
                  value={formikAddEmployee.values.dob}
                  onChange={(value) =>
                    formikAddEmployee.setFieldValue("dob", value)
                  }
                  renderInput={(params) => (
                    <TextField
                      variant="filled"
                      fullWidth
                      {...params}
                      error={
                        formikAddEmployee.touched.dob &&
                        Boolean(formikAddEmployee.errors.dob)
                      }
                      helperText={
                        formikAddEmployee.touched.dob &&
                        formikAddEmployee.errors.dob
                      }
                    />
                  )}
                />

                <TextField
                  disabled={isLoading}
                  variant="filled"
                  fullWidth
                  id="email"
                  type="email"
                  name="email"
                  label="Employee email address"
                  value={formikAddEmployee.values.email}
                  onChange={formikAddEmployee.handleChange}
                  error={
                    formikAddEmployee.touched.email &&
                    Boolean(formikAddEmployee.errors.email)
                  }
                  helperText={
                    formikAddEmployee.touched.email &&
                    formikAddEmployee.errors.email
                  }
                />

                <FormControl sx={{ m: 1 }}>
                  <InputLabel id="selectSkillsLabel">Skills</InputLabel>
                  <Select
                    disabled={isLoading}
                    labelId="selectSkillsLabel"
                    id="selectSkills"
                    multiple
                    value={employeesSkills}
                    onChange={handleChangeSkillLevelSelect}
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
                        disabled={isLoading}
                        key={item.id}
                        value={item}
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
                      disabled={isLoading}
                      id="isActive"
                      defaultChecked
                      value={formikAddEmployee.values.isActive}
                      onChange={formikAddEmployee.handleChange}
                    />
                  }
                  label="Active"
                />

                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  disabled={isLoading}
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
