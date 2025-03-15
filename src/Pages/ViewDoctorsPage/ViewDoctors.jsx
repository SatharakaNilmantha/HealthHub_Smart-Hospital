import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "./ViewDoctors.css";

function ViewDoctors() {
  const location = useLocation();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(location.state);
  const [isEditing, setIsEditing] = useState(false);

  if (!doctor) {
    return <h2 className="error-message">No doctor details available.</h2>;
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
        </div>

        <div className="profile-buttons">
          <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
          {isEditing ? (
            <Button variant="success" onClick={handleSave}>Save</Button>
          ) : (
            <Button variant="warning" onClick={handleEdit}>Edit</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewDoctors;