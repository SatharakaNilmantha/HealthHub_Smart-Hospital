import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faUser ,faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import logo from "../../Images/logo/logo-removebg.png";
import "./SideNav.css";

function SideNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);

  function handleClick() {
    window.scrollTo({ top: 0 });
    setOpenDropdown(null);
  }

  function handleDropdown(isOpen, toggleKey) {
    setOpenDropdown(isOpen ? toggleKey : null);
  }

  function handleDashboardClick(e) {
    if (location.pathname === "/") {
      e.preventDefault();
    } else {
      navigate("/");
    }
  }

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="logo" className="logo" />
      </div>

      <ul className="sidebar-links">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")} 
            onClick={handleDashboardClick}
          >
            <FontAwesomeIcon icon={faTachometerAlt} className="sidebar-icon" />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/doctors" className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")} onClick={handleClick}>
            <FontAwesomeIcon icon={faUserDoctor} className="sidebar-icon" />
            <span>Doctors</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/account" className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")} onClick={handleClick}>
            <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
            <span>Account</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideNav;
