import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { TextField, Button, Stack } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../Redux/Services/authSlice";
import { useLoginMutation } from "../Redux/Services/authApiSlice";
import CircularProgress from "@mui/material/CircularProgress";

const theme = createTheme();

const validationSchemaLoginUser = yup.object({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

export default function Login() {
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();

  const formikLoginUser = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchemaLoginUser,
    onSubmit: async (values) => {
      const loginDetails = {
        username: values.username,
        password: values.password,
      };

      try {
        var userData = await login(loginDetails).unwrap();
        dispatch(setCredentials({ ...userData }));

        // empty the fields

        navigate("/dashboard");
      } catch (error) {
        console.log(error.error);
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent={"center"} spacing={2}>
        <Grid item xs={10} sm={6} md={5} lg={4}>
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              padding: "24px",
            }}
          >
            <Avatar sx={{ width: 230, height: 230, mb: 2 }}>
              <PeopleIcon sx={{ width: 180, height: 180 }} />
            </Avatar>
            <Typography variant="h5" textAlign={"center"}>
              Welcome To The Employee Manager Dashboard
            </Typography>
            <Typography variant="subtitle1">Please login below</Typography>
          </Stack>

          <form onSubmit={formikLoginUser.handleSubmit}>
            <Stack spacing={2}>
              <TextField
                variant="filled"
                fullWidth
                id="username"
                type="username"
                name="username"
                label="Enter username"
                value={formikLoginUser.values.username}
                onChange={formikLoginUser.handleChange}
                error={
                  formikLoginUser.touched.username &&
                  Boolean(formikLoginUser.errors.username)
                }
                helperText={
                  formikLoginUser.touched.username &&
                  formikLoginUser.errors.username
                }
              />

              <TextField
                autoComplete="off"
                variant="filled"
                fullWidth
                id="password"
                type="password"
                name="password"
                label="Enter password"
                value={formikLoginUser.values.password}
                onChange={formikLoginUser.handleChange}
                error={
                  formikLoginUser.touched.password &&
                  Boolean(formikLoginUser.errors.password)
                }
                helperText={
                  formikLoginUser.touched.password &&
                  formikLoginUser.errors.password
                }
              />

              <Button
                color="primary"
                variant="contained"
                fullWidth
                disabled={isLoading}
                type="submit"
              >
                Login
              </Button>

              {isLoading && <CircularProgress />}
            </Stack>
          </form>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
