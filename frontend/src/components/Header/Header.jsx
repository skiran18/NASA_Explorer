import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Rocket, Globe, Camera, Menu, X } from "lucide-react";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      {/* Logo Section */}
      <div className="logo">
        <Rocket className="icon" />
        <span className="logo-text">
          NASA Explorer
          <div className="logo-subtext">Explore the Universe with NASA APIs</div>
        </span>
      </div>

      {/* Hamburger Menu Button (Visible on Small Screens) */}
      <button className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <X size={30} /> : <Menu size={30} />}
      </button>

      {/* Navigation */}
      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <div className="nav-buttons">
          <NavLink
            to="/"
            className={`nav-button ${location.pathname === "/" ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            <Globe className="icon-small" />
            Astronomy Picture
          </NavLink>
          <NavLink
            to="/mars"
            className={`nav-button ${location.pathname === "/mars" ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            <Camera className="icon-small" />
            Mars Exploration
          </NavLink>
          <NavLink
            to="/neo"
            className={`nav-button ${location.pathname === "/neo" ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            <Rocket className="icon-small" />
            Near Earth Objects
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
