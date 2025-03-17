import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './EmployeeListPage.css';
import SideNav from "../../components/SideNav/SideNav";

function EmployeeListPage() {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const navigate = useNavigate(); // Initialize navigate function

  const employees = [
    { id: 1, name: "Emily Clerk", role: "Nurse", shift: "7.00am-1.00pm", department: "Cardiology" },
    { id: 2, name: "Natalia Shroff", role: "Nurse", shift: "1.00pm-7.00pm", department: "Cardiology" },
    { id: 3, name: "John Doe", role: "Doctor", shift: "8.00am-4.00pm", department: "Dental" },
    { id: 4, name: "Jane Smith", role: "Receptionist", shift: "9.00am-5.00pm", department: "Neurology" },
    { id: 5, name: "Mike Johnson", role: "Technician", shift: "10.00am-6.00pm", department: "Orthopedics" },
  ];

  const filteredEmployees = selectedDepartment
    ? employees.filter(employee => employee.department === selectedDepartment)
    : employees;

  return (
    <div className="app-container">
      <SideNav />
      <div className="content">
        <div className="header">
          <h1 className="dashboard-title">HealthHub Medical Center</h1>
          <div className="department-dropdown">
            <h2>Select Department</h2>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">All Departments</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dental">Dental</option>
              <option value="Neurology">Neurology</option>
              <option value="Orthopedics">Orthopedics</option>
            </select>
          </div>
        </div>

        <div className="employee-table">
          <h2>Employee List</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Shift</th>
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.role}</td>
                  <td>{employee.shift}</td>
                  <td>{employee.department}</td>
                  <td>
                    <button className="delete-btn">Delete</button>
                    <button 
                      className="view-btn"
                      onClick={() => navigate(`/edit-employee/${employee.id}`, { state: employee })} // Navigate with state
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeeListPage;
