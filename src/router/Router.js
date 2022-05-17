import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../components/LSystem/Home";

function Router() {
  return (
    <Routes>
      {/* <Route path="/" element={<Navigate replace to="/lsystem" />} /> */}
      <Route path="/" element={<Home />} />
      {/* <Route path="*" element={<Navigate replace to="/" />} /> */}
    </Routes>
  );
}

export default Router;
