import React, { useState } from "react";
import './ViewEmployee.css';

import SideNav from "../../components/SideNav/SideNav";

function ViewEmployee() {
  // State to manage the selected department
  const [selectedDepartment, setSelectedDepartment] = useState("");

  // Sample employee data
  const employees = [
    { name: "Emily Clerk", role: "Nurse", shift: "7.00am-1.00pm", department: "Cardiology" },
    { name: "Natalia Shroff", role: "Nurse", shift: "1.00pm-7.00pm", department: "Cardiology" },
    { name: "John Doe", role: "Doctor", shift: "8.00am-4.00pm", department: "Dental" },
    { name: "Jane Smith", role: "Receptionist", shift: "9.00am-5.00pm", department: "Neurology" },
    { name: "Mike Johnson", role: "Technician", shift: "10.00am-6.00pm", department: "Orthopedics" },
  ];

  // Filter employees based on the selected department
  const filteredEmployees = selectedDepartment
    ? employees.filter(employee => employee.department === selectedDepartment)
    : employees;

  return (
   <>

<div className="app-container">
        <SideNav />
        <div className="content">
    {/* Header with Dropdown */}
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

      {/* Employee Table */}
      <div className="employee-table">
       <div> 
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
            {filteredEmployees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.name}</td>
                <td>{employee.role}</td>
                <td>{employee.shift}</td>
                <td>{employee.department}</td>
                <td>
                  <button className="delete-btn">Delete</button>
                  <button className="view-btn">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       </div>
      </div>
        </div>
      </div>


      </>
  );
}

export default ViewEmployee;