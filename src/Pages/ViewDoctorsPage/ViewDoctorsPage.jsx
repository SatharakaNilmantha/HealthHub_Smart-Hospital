import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { FaAnglesLeft } from "react-icons/fa6";
import "./ViewDoctorsPage.css";

function ViewDoctorsPage() {
  const { id } = useParams(); // Get doctor ID from URL
  const location = useLocation();
  const navigate = useNavigate();
  
  const [doctor, setDoctor] = useState(location.state || {}); // Ensure safe initialization
  const [isEditing, setIsEditing] = useState(false);

  if (!doctor || Object.keys(doctor).length === 0) {
    return <h2 className="error-message">No doctor details available.</h2>;
  }

  const handleEditSave = () => {
    setIsEditing((prev) => !prev);
  };

  const handleBackClick = () => {
    navigate(-1); // Navigate back
  };

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  return (
    <div className="doctor-profile-container1">
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
                <Form.Control type="text" name={key} value={doctor[key] || ""} onChange={handleChange} />
              ) : (
                <span>{doctor[key]}</span>
              )}
            </div>
          ))}
        </div>

        <div className="button-group">
          <button className="back-button" onClick={handleBackClick}>
            <FaAnglesLeft /> Back
          </button>

          <button
            className={`edit-update-btn ${isEditing ? "update-btn" : "edit-btn"}`}
            onClick={handleEditSave}
          >
            {isEditing ? "Update" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewDoctorsPage;
