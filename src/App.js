import { Container } from "@mui/material";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import Router from "./router/Router";
import Navi from "./components/Navi";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navi />
        <Container maxWidth="xl" sx={{ px: 8, py: 4 }}>
          <Router />
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
