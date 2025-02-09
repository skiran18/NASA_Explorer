import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MarsRover from "./pages/MarsRover";
import AsteroidTracker from "./pages/AsteroidTracker";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mars" element={<MarsRover />} />
        <Route path="/neo" element={<AsteroidTracker />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
