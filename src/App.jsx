import React from "react";
import Container from "./Components/Container";
import LandingPage from "./Components/LandingPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact component={Container} />
        <Route path="/landing" component={LandingPage} />
      </Routes>
    </Router>
  );
};

export default App;
