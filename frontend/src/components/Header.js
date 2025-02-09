import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Rocket, Globe, Camera } from "lucide-react";
import "./Header.css";

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
     
        <div className="logo">
          <Rocket className="icon" />
          <span className="logo-text">
            NASA Explorer
            <div className="logo-subtext">
              Explore the Universe with NASA APIs
            </div>
          </span>
        </div>
        
        <div className="container header-content">
        <nav className="nav">
          <div className="nav-buttons">
            <NavLink
              to="/"
              className={`nav-button ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              <Globe className="icon-small" />
              Astronomy Picture
            </NavLink>
            <NavLink
              to="/mars"
              className={`nav-button ${
                location.pathname === "/mars" ? "active" : ""
              }`}
            >
              <Camera className="icon-small" />
              Mars Exploration
            </NavLink>
            <NavLink
              to="/neo"
              className={`nav-button ${
                location.pathname === "/neo" ? "active" : ""
              }`}
            >
              <Rocket className="icon-small" />
              Near Earth Objects
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;