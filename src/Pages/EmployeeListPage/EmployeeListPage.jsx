import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EmployeeListPage.css";
import SideNav from "../../components/SideNav/SideNav";

function EmployeeListPage() {
  const [employees, setEmployees] = useState([]); // Default to an empty array
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all employees
    fetch("http://localhost:8080/api/employees/getAllEmployee")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEmployees(data);
        } else {
          setEmployees([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setEmployees([]);
      });

    // Fetch all departments dynamically and sort them alphabetically
    fetch("http://localhost:8080/api/departments/getDepartments")
      .then((response) => response.json())
      .then((data) => {
        const sortedDepartments = data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setDepartments(sortedDepartments);
      })
      .catch((error) => console.error("Error fetching departments:", error));
  }, []);

  // Filter employees based on search query and selected department
  const filteredEmployees = employees.filter((employee) => {
    const matchesDepartment = selectedDepartment
      ? employee.department === selectedDepartment
      : true;
    const matchesSearchQuery = employee.fullName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesDepartment && matchesSearchQuery;
  });

  // Handle delete employee and also delete from associated tables
  const handleDeleteEmployee = async (employeeId, email) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!confirmDelete) return;

    try {
      // Delete from associated tables (Admin, Doctor, Front Desk)
      const deleteRequests = [
        fetch(`http://localhost:8080/api/admins/deleteByEmail/${email}`, { method: "DELETE" }),
        fetch(`http://localhost:8080/api/doctors/deleteByEmail/${email}`, { method: "DELETE" }),
        fetch(`http://localhost:8080/api/registerDoctors/deleteByEmail/${email}`, { method: "DELETE" }),
        fetch(`http://localhost:8080/api/frontDeskRegisters/deleteByEmail/${email}`, { method: "DELETE" }),
      ];

      // Wait for all delete requests to complete (even if some fail)
      const responses = await Promise.allSettled(deleteRequests);

      // Check if any deletions failed due to a server error (but ignore 404 - Not Found)
      const hasError = responses.some(
        (res) => res.status === "rejected" || (res.value && !res.value.ok && res.value.status !== 404)
      );

      if (hasError) {
        alert("Warning: Some associated records might not have been deleted.");
      }

      // Proceed to delete the employee record
      const deleteEmployeeResponse = await fetch(
        `http://localhost:8080/api/employees/${employeeId}`,
        { method: "DELETE" }
      );

      if (deleteEmployeeResponse.ok) {
        // Remove deleted employee from the state
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.employeeId !== employeeId)
        );
        alert("Employee and related records deleted successfully!");
      } else {
        alert("Error deleting employee record.");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      alert("An unexpected error occurred while deleting the employee.");
    }
  };

  return (
    <div className="app-container">
      <SideNav />
      <div className="content">
        <div className="header">
          <h1 className="dashboard-title">HealthHub Medical Center</h1>

          {/* Department Selection Dropdown */}
          <div className="department-dropdown">
            <h2>Select Department</h2>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept.departmentId} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by Employee Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Employee Table */}
        <div className="employee-table">
          <h2>Employee List</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Shift Start Time</th>
                <th>Shift End Time</th>
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee.employeeId}>
                    <td>{employee.fullName}</td>
                    <td>{employee.role}</td>
                    <td>{employee.shiftStartTime ? new Intl.DateTimeFormat('en-US', { hour: '2-digit',minute: '2-digit',hour12: true,}).format(new Date(`1970-01-01T${employee.shiftStartTime}`)): ''}</td>
                    <td>{employee.shiftEndTime ? new Intl.DateTimeFormat('en-US', { hour: '2-digit',minute: '2-digit',hour12: true,}).format(new Date(`1970-01-01T${employee.shiftEndTime}`)): ''}</td>
                    <td>{employee.department}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDeleteEmployee(employee.employeeId, employee.email)
                        }
                      >
                        Delete
                      </button>
                      <button
                        className="view-btn"
                        onClick={() => {
                          console.log(
                            "Navigating to edit page with employee details:",
                            employee
                          );
                          navigate(`/edit-employee/${employee.employeeId}`, {
                            state: employee,
                          });
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeeListPage;
