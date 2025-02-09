import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import MarsRover from "./pages/MarsRover";
import AsteroidTracker from "./pages/AsteroidTracker";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="mars" element={<MarsRover />} />
          <Route path="neo" element={<AsteroidTracker />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;