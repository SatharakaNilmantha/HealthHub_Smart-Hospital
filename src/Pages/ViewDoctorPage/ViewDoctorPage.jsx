import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "./ViewDoctorPage.css";

function ViewDoctorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(location.state);
  const [isEditing, setIsEditing] = useState(false);

  // Redirect if no doctor data is available
  if (!doctor) {
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
          <img
            src={doctor.imgSrc || "https://via.placeholder.com/150"}
            alt={doctor.name}
            className="doctor-profile-image"
          />
        </div>

        <h2 className="profile-title">Profile Information</h2>
        <div className="profile-info">
          {Object.entries({
            "Full Name": "name",
            "Department": "department",
            "Title": "title",
            "Degree": "qualification",
            "Medical Licence No": "medicalLicenceNo",
            "Years of Experience": "yearsOfExperience",
            "Languages": "languages",
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
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Back
          </Button>
          {isEditing ? (
            <Button variant="success" onClick={handleSave}>
              Save
            </Button>
          ) : (
            <Button variant="warning" onClick={handleEdit}>
              Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewDoctorPage;
