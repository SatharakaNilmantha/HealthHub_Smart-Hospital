import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faUserMd, faEnvelope, faBuilding, faUsers } from "@fortawesome/free-solid-svg-icons";
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

  function handleDropdown(toggleKey) {
    setOpenDropdown((prev) => (prev === toggleKey ? null : toggleKey));
  }

  // ✅ Prevents page reload when clicking on the Dashboard link
  function handleDashboardClick(e) {
    if (location.pathname === "/dashboard") {
      e.preventDefault(); // Prevent reloading the same page
    } else {
      navigate("/dashboard");
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
            to="/dashboard" 
            className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")} 
            onClick={handleDashboardClick} // ✅ Updated event handler
          >
            <FontAwesomeIcon icon={faTachometerAlt} className="sidebar-icon" />
            <span>Dashboard</span>
          </NavLink>
        </li>

        {/* Doctors Dropdown */}
        <li>
          <Dropdown show={openDropdown === "doctors"} onToggle={() => handleDropdown("doctors")}>
            <Dropdown.Toggle variant="light" className={`sidebar-link dropdown-toggle ${location.pathname.startsWith("/doctors") || location.pathname.startsWith("/adddoctor") ? "active" : "" }`}>
              <div className="dropdown-content">
                <FontAwesomeIcon icon={faUserMd} className="sidebar-icon" />
                <span className="dropdown-text">Doctors</span>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} to="/doctors" onClick={handleClick}>Doctor List</Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/adddoctor" onClick={handleClick}>Add Doctor</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>

        {/* Department Dropdown */}
        <li>
          <Dropdown show={openDropdown === "department"} onToggle={() => handleDropdown("department")}>
            <Dropdown.Toggle variant="light" className={`sidebar-link dropdown-toggle ${location.pathname.startsWith("/departments") || location.pathname.startsWith("/adddepartment") ? "active" : "" }`}>
              <div className="dropdown-content">
                <FontAwesomeIcon icon={faBuilding} className="sidebar-icon" />
                <span className="dropdown-text">Department</span>
              </div>
            </Dropdown.Toggle>
            
            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} to="/departments" onClick={handleClick}>Department List</Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/adddepartment" onClick={handleClick}>Add Department</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>

        {/* Employees Dropdown */}
        <li>
          <Dropdown show={openDropdown === "employees"} onToggle={() => handleDropdown("employees")}>
            <Dropdown.Toggle variant="light" className={`sidebar-link dropdown-toggle ${location.pathname.startsWith("/employees") || location.pathname.startsWith("/addemployee") ? "active" : "" }`}>
              <div className="dropdown-content">
                <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
                <span className="dropdown-text">Employees</span>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} to="/employees" onClick={handleClick}>Employees List</Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/addemployee" onClick={handleClick}>Add Employee</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>

        <li>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")} onClick={handleClick}>
            <FontAwesomeIcon icon={faEnvelope} className="sidebar-icon" />
            <span>Contact</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideNav;
