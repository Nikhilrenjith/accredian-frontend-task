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

  const Boxstyle = { width: 450, margin: "20px auto" };

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
        <Login />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SignUp />
      </TabPanel>
    </Paper>
  );
};

export default Container;
