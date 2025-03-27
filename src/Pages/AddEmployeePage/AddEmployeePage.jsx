import React, { useState, useEffect } from 'react';
import './AddEmployeePage.css';
import SideNav from '../../components/SideNav/SideNav';
import axios from 'axios';
import PopupMessage from '../../Components/PopupMessage/popupMessage.jsx';
import user from '../../Images/doctor/user.jpg'

function AddEmployeePage() {
  const [photo, setPhoto] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState({
    fullName: '',  // Field name updated to 'fullName'
    email: '',
    phoneNumber: '',
    department: '',
    role: '',
    gender: 'Male',
    address: '',
    salary: '',
    shiftStartTime: '',
    shiftEndTime: '',
  });

  const [popupMessage, setPopupMessage] = useState({ type: '', message: '' });

  useEffect(() => {
    // Fetch departments from backend
    axios.get('http://localhost:8080/api/departments/getDepartments')
      .then(response => {
        const sortedDepartments = response.data.sort((a, b) => a.name.localeCompare(b.name));
        setDepartments(sortedDepartments);
      })
      .catch(error => {
        console.error('Error fetching departments:', error);
      });
  }, []);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file)); // Preview the photo before upload
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "salary" && !/^\d*\.?\d*$/.test(value)) return; // Validate salary (only numbers and decimals)
    setEmployeeDetails({ ...employeeDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    setPopupMessage({ type: 'hidden', message: 'Processing the request...' });

    const formData = new FormData();
    
    // Append employee details as JSON string
    formData.append('employee', JSON.stringify(employeeDetails));
    
    // Append the image
    if (photo) {
      const fileInput = document.getElementById('photo');
      if (fileInput.files[0]) {
        formData.append('image', fileInput.files[0]);
      }
    }

    try {
      const response = await axios.post('http://localhost:8080/api/employees/saveEmployee', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setPopupMessage({ type: 'success', message: response.data });

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      setPopupMessage({
        type: error.response ? 'error' : 'warning',
        message: error.response ? error.response.data : 'Please check the connection',
      });
    }
  };

  return (
    <div className="app-container1">
      <SideNav />
      <div className="content">
        <div className="add-employee-container">
          <div className="add-employee-header">
            <h2>Add Employee</h2>
            <p>Fill in the details below to add a new employee.</p>
          </div>

          <div className="profile-header-card">
            <div className="profile-header">
              {photo ? (
                <img className="profile-photo" src={photo} alt="Profile" />
              ) : (
                <img className="profile-photo" src={user} alt="Profile Placeholder" />
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

          <form className="add-employee-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label className="field-label">Full Name</label>
              <input 
                type="text" 
                className="editable-input" 
                name="fullName" 
                value={employeeDetails.fullName} 
                onChange={handleInputChange} 
                placeholder="Enter full name" 
                required 
              />
            </div>

            <div className="form-row">
              <label className="field-label">Email</label>
              <input 
                type="email" 
                className="editable-input" 
                name="email" 
                value={employeeDetails.email} 
                onChange={handleInputChange} 
                placeholder="Enter Employee email" 
                required 
              />
            </div>

            <div className="form-row">
              <label className="field-label">Phone Number</label>
              <input 
                type="text" 
                className="editable-input" 
                name="phoneNumber" 
                value={employeeDetails.phoneNumber} 
                onChange={handleInputChange} 
                placeholder="Enter Employee Phone Number" 
                required 
              />
            </div>

            {/* Department Selection */}
            <div className="form-row">
              <label className="field-label">Department</label>
              <select 
                className="editable-input" 
                name="department" 
                value={employeeDetails.department} 
                onChange={handleInputChange} 
                required
              >
                <option value="">Select a department</option>
                {departments.map((dept) => (
                  <option key={dept.departmentId} value={dept.name}>{dept.name}</option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <label className="field-label">Role</label>
              <input 
                type="text" 
                className="editable-input" 
                name="role" 
                value={employeeDetails.role} 
                onChange={handleInputChange} 
                placeholder="Enter role" 
                required 
              />
            </div>

            <div className="form-row">
              <label className="field-label">Gender</label>
              <select 
                className="editable-input" 
                name="gender" 
                value={employeeDetails.gender} 
                onChange={handleInputChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-row">
              <label className="field-label">Address</label>
              <textarea 
                className="editable-input" 
                name="address" 
                value={employeeDetails.address} 
                onChange={handleInputChange} 
                placeholder="Enter address" 
                required 
              />
            </div>

            <div className="form-row">
              <label className="field-label">Salary</label>
              <input 
                type="text" 
                className="editable-input" 
                name="salary" 
                value={employeeDetails.salary} 
                onChange={handleInputChange} 
                placeholder="Enter salary" 
                required 
              />
            </div>

            <div className="form-row">
              <label className="field-label">Shift Start Time</label>
              <input 
                type="time" 
                className="editable-input" 
                name="shiftStartTime" 
                value={employeeDetails.shiftStartTime} 
                onChange={handleInputChange} 
                required 
              />
            </div>

            <div className="form-row">
              <label className="field-label">Shift End Time</label>
              <input 
                type="time" 
                className="editable-input" 
                name="shiftEndTime" 
                value={employeeDetails.shiftEndTime} 
                onChange={handleInputChange} 
                required 
              />
            </div>

            <div className="form-buttons">
              <button type="submit" className="save-button">Save</button>
            </div>
          </form>
        </div>
      </div>

      <PopupMessage type={popupMessage.type} message={popupMessage.message} />
    </div>
  );
}

export default AddEmployeePage;
