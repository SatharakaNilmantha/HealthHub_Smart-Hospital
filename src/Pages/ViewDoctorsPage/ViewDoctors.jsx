import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "./ViewDoctors.css";

function ViewDoctors() {
  const location = useLocation();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(location.state);
  const [isEditing, setIsEditing] = useState(false);

  // Redirect if no doctor data is available
  if (!doctor) {
    return <h2 className="error-message">No doctor details available.</h2>;

    navigate("/doctors");
    return null;
  }

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  return (

    <div className="doctor-profile-container">
      <div className="doctor-profile-card">
        <div className="profile-header">
          <img src={doctor.imgSrc} alt={doctor.name} className="doctor-profile-image" />
          
          <Button variant="primary">Change Photo</Button>
        </div>

        <h2 className="profile-title">Profile Information</h2>
        <div className="profile-info">
          {Object.entries({
            "Full Name": "name",
            "Department": "specialization",
            "Title": "title",
            "Degree": "qualification",
            "Description": "description",
            "Gender": "gender",
            "Address": "address",
            "Phone Number": "phone",
            "Fees": "fee",
          }).map(([label, key]) => (
            <div className="profile-row" key={key}>
              <strong>{label}</strong>
              {isEditing ? (
                <Form.Control
                  type="text"
                  name={key}
                  value={doctor[key] || ""}
                  onChange={handleChange}
                />
              ) : (
                <span>{doctor[key]}</span>
              )}
            </div>
          ))}

    <div className="container mt-5">
      {/* Profile Card */}
      <div className="card shadow-sm p-4">
        <div className="text-center">
          <img 
            src={doctor.imgSrc || "https://via.placeholder.com/120"} 
            alt={doctor.name} 
            className="rounded-circle border border-2" 
            width="120" 
            height="120"
          />
          <h5 className="mt-3">{doctor.name}</h5>
          <p className="text-muted">Your profile photo will appear on apps and devices.</p>
          <Button variant="primary" size="sm">Change Photo</Button>

        </div>


        <div className="profile-buttons">
          <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
          {isEditing ? (
            <Button variant="success" onClick={handleSave}>Save</Button>
          ) : (
            <Button variant="warning" onClick={handleEdit}>Edit</Button>
          )}

      {/* Profile Information */}
      <div className="card shadow-sm p-4 mt-4">
        <h4 className="mb-3">Profile Information</h4>
        <table className="table table-borderless">
          <tbody>
            <tr><th>Full Name</th><td>{doctor.name}</td></tr>
            <tr><th>Department</th><td>{doctor.specialization}</td></tr>
            <tr><th>Title</th><td>{doctor.title}</td></tr>
            <tr><th>Degree</th><td>{doctor.qualification}</td></tr>
            <tr><th>Description</th><td>{doctor.description || "N/A"}</td></tr>
            <tr><th>Gender</th><td>{doctor.gender || "N/A"}</td></tr>
            <tr><th>Address</th><td>{doctor.address || "N/A"}</td></tr>
            <tr><th>Phone Number</th><td>{doctor.phone || "N/A"}</td></tr>
            <tr><th>Fees</th><td>${doctor.fee ?? "N/A"}</td></tr>
          </tbody>
        </table>
        
        <div className="d-flex justify-content-between">
          <Button variant="link" onClick={() => navigate(-1)}>❮ Back</Button>
          <Button variant="primary">Edit</Button>

        </div>
      </div>
    </div>
  );
}
export default ViewDoctors;

