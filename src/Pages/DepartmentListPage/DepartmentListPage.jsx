import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DepartmentListPage.css';
import SideNav from '../../components/SideNav/SideNav';

function DepartmentListPage() {
  const navigate = useNavigate(); // Hook for navigation

  // List of departments
  const departments = [
    { name: 'Cardiology', rooms: 10, doctors: 5 },
    { name: 'Dental', rooms: 8, doctors: 4 },
    { name: 'Neurology', rooms: 12, doctors: 6 },
    { name: 'Orthopedics', rooms: 7, doctors: 3 },
  ];

  // Function to navigate to ViewDepartmentPage with selected department data
  const handleViewClick = (department) => {
    navigate('/view-department', {
      state: { department }, // Pass department data as state
    });
  };

  return (
    <div className="app-container">
      <SideNav />
      <div className="content">
        <h2>View Departments</h2>
        <div className="view-department-container">
          <div className="search-bar">
            <input type="text" placeholder="Search Department" />
          </div>
          <div className="department-list">
            {departments.map((dept, index) => (
              <div key={index} className="department-card">
                <h3>{dept.name}</h3>
                <p>No of Rooms: {dept.rooms}</p>
                <p>No of Doctors: {dept.doctors}</p>
                <button onClick={() => handleViewClick(dept)}>View</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepartmentListPage;
