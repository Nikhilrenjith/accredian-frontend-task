import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { FormHelperText } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const initialValues = {
    fname: "",
    lname: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
    termsAndConditions: false,
  };
  const validationSchema = Yup.object().shape({
    lname: Yup.string().min(3, "Too short").required("Required"),
    fname: Yup.string().min(3, "Too short").required("Required"),
    email: Yup.string().email("Enter a valid email").required("Required"),
    number: Yup.number()
      .typeError("Enter valid Phone Number")
      .required("Required"),
    password: Yup.string()
      .min(8, "Password minimum length should be 8")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Required"),

    termsAndConditions: Yup.string().oneOf(
      ["true"],
      "Please accept the terms & conditions"
    ),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      /* deploying link */
      const response = await fetch(
        "https://accredian-backend-task-gules.vercel.app/api/signup",
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
        console.log("Account created successfully");
        toast.success("Account created successfully");
        resetForm();
      } else {
        toast.warn("Email Already Exists");
      }
    } catch (error) {
      console.error("Error during account creation:", error);
      toast.error("Account creation failed");
    } finally {
      setSubmitting(false);
    }
    console.log(values);
  };
  const errorTextStyle = { color: "red", marginLeft: -1 };
  const paperStyle = {
    padding: 20,
    width: 500,
    margin: "0 auto",
  };
  return (
    <Paper style={paperStyle}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box sx={{ mt: 3 }}>
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
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(props) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      name="fname"
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      helperText={
                        <ErrorMessage name="fname">
                          {(msg) => (
                            <FormHelperText sx={errorTextStyle}>
                              {msg}
                            </FormHelperText>
                          )}
                        </ErrorMessage>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lname"
                      autoComplete="family-name"
                      helperText={
                        <ErrorMessage name="lname">
                          {(msg) => (
                            <FormHelperText sx={errorTextStyle}>
                              {msg}
                            </FormHelperText>
                          )}
                        </ErrorMessage>
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
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
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      name="number"
                      label="Phone Number"
                      id="number"
                      autoComplete="number"
                      helperText={
                        <ErrorMessage name="number">
                          {(msg) => (
                            <FormHelperText sx={errorTextStyle}>
                              {msg}
                            </FormHelperText>
                          )}
                        </ErrorMessage>
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
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
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      autoComplete="confirm-password"
                      helperText={
                        <ErrorMessage name="confirmPassword">
                          {(msg) => (
                            <FormHelperText sx={errorTextStyle}>
                              {msg}
                            </FormHelperText>
                          )}
                        </ErrorMessage>
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          name="termsAndConditions"
                          color="primary"
                        />
                      }
                      label="I accept the terms and conditions."
                    />
                    <FormHelperText sx={errorTextStyle}>
                      <ErrorMessage name="termsAndConditions" />
                    </FormHelperText>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={props.isSubmitting}
                  sx={{ mt: 3, mb: 2 }}
                >
                  {props.isSubmitting ? "Loading" : "Sign up"}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Paper>
  );
}
