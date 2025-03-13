import React, { useState } from 'react';
import './AddEmployeePage.css';

function AddEmployeePage() {
  const [photo, setPhoto] = useState(null); // State to handle photo upload

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file)); // Create a preview of the uploaded photo
    }
  };

  return (
    <div className="add-employee-container">
      {/* Header Section */}
      <div className="add-employee-header">
        <h2>Add Employee</h2>
        <p>Fill in the details below to add a new employee.</p>
      </div>

      {/* Photo Upload Section */}
      <div className="profile-header-card">
        <div className="profile-header">
          {/* Display uploaded photo */}
          {photo ? (
            <img className="profile-photo" src={photo} alt="Profile" />
          ) : (
            <img className="profile-photo" src="https://via.placeholder.com/100" alt="Profile Placeholder" />
          )}
          <div className="profile-info">
            <h3>Employee Photo</h3>
            <p>Upload a photo for the employee profile.</p>
            <label className="upload-btn">
              Add Photo
              <input type="file" id="photo" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
            </label>
          </div>
        </div>
      </div>

      {/* Employee Details Form */}
      <form className="add-employee-form">
        {/* Full Name */}
        <div className="form-row">
          <label className="field-label">Full Name</label>
          <input type="text" className="editable-input" placeholder="Enter full name" required />
        </div>

        {/* Department */}
        <div className="form-row">
          <label className="field-label">Department</label>
          <input type="text" className="editable-input" placeholder="Enter department" required />
        </div>

        {/* Role */}
        <div className="form-row">
          <label className="field-label">Role</label>
          <input type="text" className="editable-input" placeholder="Enter role" required />
        </div>

        {/* Gender */}
        <div className="form-row">
          <label className="field-label">Gender</label>
          <select className="editable-input">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Address */}
        <div className="form-row">
          <label className="field-label">Address</label>
          <textarea className="editable-input" placeholder="Enter address" required />
        </div>

        {/* Salary */}
        <div className="form-row">
          <label className="field-label">Salary</label>
          <input type="text" className="editable-input" placeholder="Enter salary" required />
        </div>

        {/* Shift */}
        <div className="form-row">
          <label className="field-label">Shift</label>
          <input type="text" className="editable-input" placeholder="Enter shift" required />
        </div>

        {/* Buttons */}
        <div className="form-buttons">
          <button type="button" className="back-button">Back</button>
          <button type="submit" className="save-button">Save</button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployeePage;