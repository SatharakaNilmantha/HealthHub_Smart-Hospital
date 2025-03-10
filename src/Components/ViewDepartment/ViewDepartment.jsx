import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewDepartment.css';

const ViewDepartment = () => {
  const navigate = useNavigate(); // Hook for navigation

  const departments = [
    { name: 'Cardiology', rooms: 10, doctors: 5 },
    { name: 'Dental', rooms: 8, doctors: 4 },
    { name: 'Neurology', rooms: 12, doctors: 6 },
    { name: 'Orthopedics', rooms: 7, doctors: 3 },
  ];

  const handleEditClick = (department) => {
    navigate('/edit-department', {
      state: { department } // Pass the department data as state
    });
  };

  return (
    <div className="view-department-container">
      <h2>View Department</h2>
      <div className="search-bar">
        <input type="text" placeholder="Search Department" />
      </div>
      <div className="department-list">
        {departments.map((dept, index) => (
          <div key={index} className="department-card">
            <h3>{dept.name}</h3>
            <p>No of Rooms: {dept.rooms}</p>
            <p>No of Doctors: {dept.doctors}</p>
            <button onClick={() => handleEditClick(dept)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewDepartment;
