import React, { useState,useEffect } from 'react';
import axios from 'axios'; // Axios for making API requests
import SideNav from '../../components/SideNav/SideNav';
import './AddDoctors.css';
import 'react-toastify/dist/ReactToastify.css'; // Importing CSS for Toast notifications
import PopupMessage from '../../Components/PopupMessage/popupMessage.jsx'; // Importing PopupMessage component

function AddDoctors() {
  const [doctorDetails, setDoctorDetails] = useState({
    doctorId: '',
    address: '',
    email: '',
    degree: '',
    department: '',
    description: '',
    fees: '',
    fullName: '',
    gender: 'Male',
    imageUrl: '',
    phoneNumber: '',
    title: '',
  });

  const [photo, setPhoto] = useState(null); // State for the profile photo
  const [popup, setPopupMessage] = useState({ type: '', message: '' }); // State for popup message
  const [isDoctor, setIsDoctor] = useState(false); // State to check if the user is a registered doctor
  const [isDuplicate, setIsDuplicate] = useState(false); // State to check for duplicates
  const [departments, setDepartments] = useState([]); // State to hold the sorted departments

  // Fetch employees and departments when component mounts
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/employees/getAllEmployee');
        const employees = response.data;

        // Filter employees who are doctors
        const doctorEmployees = employees.filter(emp => emp.role = 'doctor');

        // Extract departments and remove duplicates
        const departmentList = [...new Set(doctorEmployees.map(emp => emp.department))];

        // Sort departments alphabetically
        departmentList.sort();

        setDepartments(departmentList);
      } catch (error) {
        setPopupMessage({ type: 'error', message: 'Error fetching employee data.' });
      }
    };

    fetchDepartments();
  }, []); // Run this only once on component mount


  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctorDetails({ ...doctorDetails, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file)); // Preview the photo before upload
    }
  };

  // Check for duplicate doctor (email or doctor ID)
  const checkDuplicateDoctor = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/doctors/getAllDoctors');
      const doctors = response.data;

      const duplicate = doctors.find((doc) => doc.email === doctorDetails.email || doc.doctorId === doctorDetails.doctorId);

      if (duplicate) {
        setIsDuplicate(true);
        setPopupMessage({ type: 'error', message: 'Doctor details are already insert' });
      } else {
        setIsDuplicate(false);
      }
    } catch (error) {
      setPopupMessage({ type: 'warning', message: 'Error checking registration. Please check the connection' });
    }
  };

  // Check if the email corresponds to a registered doctor
  const checkDoctorRegistration = async () => {
      const response = await axios.get('http://localhost:8080/api/employees/getAllEmployee');
      const employees = response.data;

      const doctor = employees.find(emp => emp.email === doctorDetails.email && emp.role === 'doctor');

      if (doctor) {
        setIsDoctor(true);
      } else {
        setIsDoctor(false);
        setPopupMessage({ type: 'error', message: 'You are not registered as an Employee.' });
      }
    
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setPopupMessage({ type: 'hidden', message: 'Processing the request...' });

    // First, check for duplicate doctor
    await checkDuplicateDoctor();

    if (isDuplicate) {
      return; // Don't proceed if there's a duplicate
    }

    // Then, check if the email corresponds to a registered doctor
    await checkDoctorRegistration();

    if (!isDoctor) {
      return; // Don't proceed if not a registered doctor
    }

    const formData = new FormData();

    // Append doctor details to formData
    formData.append('doctor', JSON.stringify(doctorDetails));

    // Append the image
    if (photo) {
      const fileInput = document.getElementById('photo');
      if (fileInput.files[0]) {
        formData.append('image', fileInput.files[0]);
      }
    }

    try {
      const response = await axios.post('http://localhost:8080/api/doctors/saveDoctor', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setPopupMessage({ type: 'success', message: response.data });
        
        // Reset form after submission
        setDoctorDetails({
          doctorId: '',
          address: '',
          email: '',
          degree: '',
          department: '',
          description: '',
          fees: '',
          fullName: '',
          gender: 'Male',
          imageUrl: '',
          phoneNumber: '',
          title: '',
        });
        setPhoto(null);
      }
    } catch (error) {
      setPopupMessage({
        type: error.response ? 'error' : 'warning',
        message: error.response ? error.response.data : 'Please check the connection',
      });
    }
  };

  return (
    <div className="app-container">
      <SideNav />
      <div className="content">
        <div className="add-Doctor-container">
          <div className="add-Doctor-header">
            <h2>Add Doctor</h2>
            <p>Fill in the details below to add a new Doctor.</p>
          </div>

          <div className="profile-header-card">
            <div className="profile-header">
              {photo ? (
                <img className="profile-photo" src={photo} alt="Profile" />
              ) : (
                <img className="profile-photo" src="https://via.placeholder.com/100" alt="Profile Placeholder" />
              )}
              <div className="profile-info">
                <h3>Doctor Photo</h3>
                <p>Upload a photo for the Doctor profile.</p>
                <label className="upload-btn">
                  Add Photo
                  <input
                    type="file"
                    id="photo"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label className="field-label">Full Name</label>
              <input
                type="text"
                className="editable-input"
                name="fullName"
                value={doctorDetails.fullName}
                onChange={handleInputChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="form-row">
              <label className="field-label">Title</label>
              <input
                type="text"
                className="editable-input"
                name="title"
                value={doctorDetails.title}
                onChange={handleInputChange}
                placeholder="Enter title"
                required
              />
            </div>

            <div className="form-row">
              <label className="field-label">Email</label>
              <input
                type="email"
                className="editable-input"
                name="email"
                value={doctorDetails.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                required
              />
            </div>

            <div className="form-row">
              <label className="field-label">Phone Number</label>
              <input
                type="text"
                className="editable-input"
                name="phoneNumber"
                value={doctorDetails.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                required
              />
            </div>

            <div className="form-row">
              <label className="field-label">Address</label>
              <textarea
                className="editable-input"
                name="address"
                value={doctorDetails.address}
                onChange={handleInputChange}
                placeholder="Enter address"
                required
              />
            </div>

            <div className="form-row">
              <label className="field-label">Degree</label>
              <input
                type="text"
                className="editable-input"
                name="degree"
                value={doctorDetails.degree}
                onChange={handleInputChange}
                placeholder="Enter degree"
                required
              />
            </div>

            <div className="form-row">
              <label className="field-label">Department</label>
              <select
                className="editable-input"
                name="department"
                value={doctorDetails.department}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept, index) => (
                  <option key={index} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <label className="field-label">Description</label>
              <textarea
                className="editable-input"
                name="description"
                value={doctorDetails.description}
                onChange={handleInputChange}
                placeholder="Enter description"
                required
              />
            </div>

            <div className="form-row">
              <label className="field-label">Fees</label>
              <input
                type="number"
                className="editable-input"
                name="fees"
                value={doctorDetails.fees}
                onChange={handleInputChange}
                placeholder="Enter fees"
                required
              />
            </div>

            <div className="form-row">
              <label className="field-label">Gender</label>
              <select
                className="editable-input"
                name="gender"
                value={doctorDetails.gender}
                onChange={handleInputChange}
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-buttons">
              <button type="submit" className="save-button">Save</button>
            </div>
          </form>
        </div>
      </div>

      {/* ToastContainer to show the success/error messages */}
      <PopupMessage type={popup.type} message={popup.message} />
    </div>
  );
}

export default AddDoctors;
