import React from "react";
import Container from "./Components/Container";

const App = () => {
  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1540800458874-73e6a5eed8ac?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(8px)",
        padding: "20px",
      }}
    >
      <Container />
    </div>
  );
};

export default App;
