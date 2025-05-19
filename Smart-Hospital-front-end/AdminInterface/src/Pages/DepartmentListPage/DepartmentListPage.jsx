import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DepartmentListPage.css';
import SideNav from '../../components/SideNav/SideNav';

function DepartmentListPage() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch department data from the backend
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/departments/getDepartments');
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  // Function to handle search filtering
  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to navigate to ViewDepartmentPage with selected department data
  const handleViewClick = (department) => {
    console.log(department);  // Check if 'id' exists here
    console.log(`${department.departmentId}`);  // Corrected string interpolation
    navigate(`/view-department/${department.departmentId}`, {
      state: { department },
    });
  };

  // Function to handle department deletion
  const handleDeleteClick = async (departmentId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this department?");
    if (isConfirmed) {
      try {
        // Sending a DELETE request to the backend
        const response = await axios.delete(`http://localhost:8080/api/departments/${departmentId}`);
        console.log(response.data);  // You can log the response if needed

        // Remove the deleted department from the state
        setDepartments(departments.filter(department => department.departmentId !== departmentId));
      } catch (error) {
        console.error('Error deleting department:', error);
      }
    }
  };

  return (
    <div className="app-container">
      <SideNav />
      <div className="content">
        <h2>View Departments</h2>
        <div className="view-department-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Department"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredDepartments.length > 0 ? (
            <div className="department-list">
              {filteredDepartments.map((dept, index) => (
                <div key={index} className="department-card">
                  <h3>{dept.name}</h3>
                  <p>No of Rooms: {dept.noOfRooms}</p>
                  <p>No of Doctors: {dept.noOfDoctors}</p>
                  <div className='buttongroup'>
                     <button className="view-button" onClick={() => handleViewClick(dept)}>View</button>
                     <button className="delete-button" onClick={() => handleDeleteClick(dept.departmentId)}> Delete</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-department-message">No department found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DepartmentListPage;
