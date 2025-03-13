import React from 'react';
import { useLocation } from 'react-router-dom';
import './EditDepartmentPage.css'; // Import the CSS file

const EditDepartmentPage = () => {
  const { state } = useLocation();
  const department = state?.department;

  if (!department) {
    return <p>No department data available</p>;
  }

  return (
    <div className="edit-department-container">
      <form className="edit-department-form">
        <h2>Edit Department</h2>
        
        <div className="form-group">
          <label>Department Name:</label>
          <input type="text" defaultValue={department.name} />
        </div>

        <div className="form-group">
          <label>Number of Rooms:</label>
          <input type="number" defaultValue={department.rooms} />
        </div>

        <div className="form-group">
          <label>Number of Doctors:</label>
          <input type="number" defaultValue={department.doctors} />
        </div>

        <button type="submit" className="submit-btn">Save Changes</button>
      </form>
    </div>
  );
};

export default EditDepartmentPage;
