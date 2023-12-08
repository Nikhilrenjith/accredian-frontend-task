import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Login from "./Login";
import SignUp from "./Signup";
import { Paper } from "@mui/material";
const Container = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const Boxstyle = { width: 500, margin: "20px auto" };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  return (
    <div
      style={{
        backgroundImage: `url(
          "https://images.unsplash.com/photo-1540800458874-73e6a5eed8ac?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        )`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
        height: "100vh",
      }}
    >
      <Paper style={Boxstyle} elevation={20}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="disabled tabs example"
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab sx={{ minWidth: "50%" }} label="Sign In" />
          <Tab sx={{ minWidth: "50%" }} label="Sign Up" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Login handleChange={handleChange} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SignUp />
        </TabPanel>
      </Paper>
    </div>
  );
};

export default Container;
