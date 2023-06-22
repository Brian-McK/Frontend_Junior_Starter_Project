import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { TextField, Button, Stack, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useAddEmployeeMutation } from "../Redux/Services/EmployeeSkillLevelService";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useGetAllSkillLevelsQuery } from "../Redux/Services/EmployeeSkillLevelService";

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

const skills = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, employeesSkills, theme) {
  return {
    fontWeight:
      employeesSkills.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const today = dayjs();

const validationSchemaAddEmployee = yup.object({
  firstName: yup.string("Enter first name").required("First name is required"),
  lastName: yup.string("Enter last name").required("Last name is required"),
  dob: yup.date().nonNullable("Cant be empty").typeError("Invalid Date"),
  email: yup.string().required("Email is required").email(),
  isActive: yup.boolean().required(),
});

export default function AddEmployee() {
  const theme = useTheme();

  const {
    data: skillLevels = [],
    isLoading: isLoadingSkillLevels,
    isSuccess: isSuccessSkillLevels,
    isError: isErrorSkillLevels,
    error: skillLevelsError,
  } = useGetAllSkillLevelsQuery();

  console.log(skillLevels);

  const [employeesSkills, setEmployeesSkills] = useState([]);

  const handleChangeSkillLevelSelect = (event) => {
    const {
      target: { value },
    } = event;
    setEmployeesSkills(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const [addEmployee, { data, isError, isLoading, isSuccess }] =
    useAddEmployeeMutation();

  // reset form if successfull
  React.useEffect(() => {
    formikAddEmployee.resetForm();
  }, [isSuccess]);

  const formikAddEmployee = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      dob: today,
      email: "",
      isActive: false,
    },
    validationSchema: validationSchemaAddEmployee,
    onSubmit: async (values) => {
      const addEmployeePayload = {
        firstName: values.firstName,
        lastName: values.lastName,
        dob: `${values.dob.format("DD/MM/YYYY")}`,
        email: values.email,
        isActive: values.isActive,
      };

      addEmployee(addEmployeePayload);
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
                  variant="filled"
                  fullWidth
                  id="lastName"
                  type="text"
                  name="lastName"
                  label="Last Name"
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

                <DatePicker
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
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {skillLevels.map(({ name }) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, employeesSkills, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

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
