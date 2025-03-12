import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function ViewDoctorsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state;

  if (!doctor) {
    return <p>No doctor data available.</p>;
  }

  return (
    <div className="container mt-5">
      {/* Profile Card */}
      <div className="card shadow-sm p-4">
        <div className="text-center">
          <img 
            src={doctor.imgSrc} 
            alt={doctor.name} 
            className="rounded-circle border border-2" 
            width="120" 
            height="120"
          />
          <h5 className="mt-3">{doctor.name}</h5>
          <p className="text-muted">Your profile photo will appear on apps and devices.</p>
          <Button variant="primary" size="sm">Change Photo</Button>
        </div>
      </div>

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
            <tr><th>Fees</th><td>${doctor.fee}</td></tr>
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

export default ViewDoctorsPage;
