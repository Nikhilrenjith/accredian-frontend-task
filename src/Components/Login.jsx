import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormHelperText } from "@mui/material";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ handleChange }) => {
  const errorTextStyle = { color: "red", marginLeft: -1 };
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Please enter valid email").required("Required"),
    password: Yup.string().required("Password Required"),
  });
  const paperStyle = {
    padding: 20,
    height: "85vh",
    width: 500,
    margin: "0 auto",
  };
  const onSubmit = async (values, props) => {
    try {
      const response = await fetch(
        "https://accredian-backend-task-gules.vercel.app/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        console.log("Login successful");
        toast.success("Login successful");
      } else {
        console.error("Login failed:", data.message);
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      props.resetForm();
      props.setSubmitting(false);
    }
  };
  return (
    <Paper style={paperStyle}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 2, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        <Box sx={{ mt: 1 }}>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(props) => (
              <Form>
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  helperText={
                    <ErrorMessage name="email">
                      {(msg) => (
                        <FormHelperText sx={errorTextStyle}>
                          {msg}
                        </FormHelperText>
                      )}
                    </ErrorMessage>
                  }
                />
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  helperText={
                    <ErrorMessage name="password">
                      {(msg) => (
                        <FormHelperText sx={errorTextStyle}>
                          {msg}
                        </FormHelperText>
                      )}
                    </ErrorMessage>
                  }
                />
                <Field
                  as={FormControlLabel}
                  name="showPassword"
                  sx={{ mt: 2 }}
                  control={
                    <Checkbox
                      color="primary"
                      onChange={() => setShowPassword(!showPassword)}
                    />
                  }
                  label="Show Password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={props.isSubmitting}
                >
                  {props.isSubmitting ? "Loading" : "Sign in"}
                </Button>
              </Form>
            )}
          </Formik>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => handleChange("event", 1)}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};
export default Login;
