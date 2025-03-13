import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faCalendarCheck, faUser, faStethoscope } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";
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

        {/* Appointment Dropdown */}
        <li>
          <Dropdown show={openDropdown === "appointment"} onToggle={(isOpen) => handleDropdown(isOpen, "appointment")}>
            <Dropdown.Toggle variant="light" className={`sidebar-link dropdown-toggle ${location.pathname.startsWith("/treatment") || location.pathname.startsWith("/consultation") ? "active" : "" }`}>
              <div className="dropdown-content">
                <FontAwesomeIcon icon={faCalendarCheck} className="sidebar-icon" />
                <span className="dropdown-text">Appointment</span>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} to="/treatment" onClick={handleClick}>
                <FontAwesomeIcon className="dropdown-icon" /> Treatment
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/consultation" onClick={handleClick}>
                <FontAwesomeIcon  className="dropdown-icon" /> Consultation
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>

        <li>
          <NavLink to="/prescription" className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")} onClick={handleClick}>
            <FontAwesomeIcon icon={faStethoscope} className="sidebar-icon" />
            <span>Prescription</span>
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
