import React, { useState } from "react";
import "./EditEmployeePage.css"; // Ensure this path is correct
import SideNav from "../../components/SideNav/SideNav"; // Import the sidebar component

function EditEmployeePage() {
  const [photo, setPhoto] = useState("https://via.placeholder.com/100");
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [employee, setEmployee] = useState({
    fullName: "John Doe",
    department: "Cardiology",
    role: "Doctor",
    gender: "Male",
    address: "123 Main St, City, Country",
    salary: "$5000",
    shift: "Day Shift",
  });

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSave = () => {
    if (isEditing) {
      // Save logic (e.g., update employee data via API)
      console.log("Updated Employee Data:", employee);
    }
    setIsEditing(!isEditing); // Toggle edit mode
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <SideNav />

      {/* Main Content */}
      <div className="main-content">
        <div className="edit-employee-container">
          {/* Header Section */}
          <div className="edit-employee-header">
            <h2>Edit Employee Profile</h2>
            <p>Update the details below to edit the employee profile.</p>
          </div>

          {/* Photo Upload Section */}
          <div className="profile-header-card">
            <div className="profile-header">
              <img className="profile-photo" src={photo} alt="Profile" />
              <div className="profile-info">
                <h3>Employee Photo</h3>
                <p>Upload a new photo for the employee profile.</p>
                {isEditing && (
                  <label className="upload-btn">
                    Change Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      style={{ display: "none" }}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Employee Details Form */}
          <form className="edit-employee-form">
            {/* Full Name */}
            <div className="form-row">
              <label className="field-label">Full Name</label>
              <input
                type="text"
                className="editable-input"
                name="fullName"
                value={employee.fullName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            {/* Department */}
            <div className="form-row">
              <label className="field-label">Department</label>
              <input
                type="text"
                className="editable-input"
                name="department"
                value={employee.department}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            {/* Role */}
            <div className="form-row">
              <label className="field-label">Role</label>
              <input
                type="text"
                className="editable-input"
                name="role"
                value={employee.role}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            {/* Gender */}
            <div className="form-row">
              <label className="field-label">Gender</label>
              <select
                className="editable-input"
                name="gender"
                value={employee.gender}
                onChange={handleInputChange}
                disabled={!isEditing}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Address */}
            <div className="form-row">
              <label className="field-label">Address</label>
              <textarea
                className="editable-input"
                name="address"
                value={employee.address}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            {/* Salary */}
            <div className="form-row">
              <label className="field-label">Salary</label>
              <input
                type="text"
                className="editable-input"
                name="salary"
                value={employee.salary}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            {/* Shift */}
            <div className="form-row">
              <label className="field-label">Shift</label>
              <input
                type="text"
                className="editable-input"
                name="shift"
                value={employee.shift}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            {/* Buttons */}
            <div className="form-buttons">
              <button
                type="button"
                className={isEditing ? "save-button" : "edit-button"}
                onClick={handleEditSave}
              >
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditEmployeePage;