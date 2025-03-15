import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SideNav from "../../components/SideNav/SideNav.jsx";
import doctor1 from "../../Images/doctor/doctor1.jpg";
import doctor2 from "../../Images/doctor/doctor2.jpg";
import doctor3 from "../../Images/doctor/doctor3.jpg";
import doctor4 from "../../Images/doctor/doctor4.jpg";
import "./DoctorsListPage.css";

function DoctorsListPage() {
  const doctors = [
    { id: 1, department: "Dental", name: "Deyel Fernando", title: "Chief Medical Officer", imgSrc: doctor1, yearsOfExperience: 4, qualification: "MBBS", medicalLicenceNo: 204560, languages: "Sinhala", fee: 50 },
    { id: 2, department: "Cardiology", name: "Emma Hailey", title: "Senior Cardiologist", imgSrc: doctor2, yearsOfExperience: 4, qualification: "MBBS", medicalLicenceNo: 204560, languages: "English", fee: 50 },
    { id: 3, department: "Neurology", name: "Merlin De Silva", title: "Neurosurgeon", imgSrc: doctor3, yearsOfExperience: 4, qualification: "MBBS", medicalLicenceNo: 204560, languages: "English", fee: 50 },
    { id: 4, department: "Orthopedics", name: "Meth Medha De Mel", title: "Orthopedic Specialist", imgSrc: doctor4, yearsOfExperience: 4, qualification: "MBBS", medicalLicenceNo: 204560, languages: "English", fee: 50 }
  ];

  const [activeDepartment, setActiveDepartment] = useState("All");
  const navigate = useNavigate();

  const departments = ["All", ...new Set(doctors.map((doctor) => doctor.department))];

  const filteredDoctors = activeDepartment === "All" ? doctors : doctors.filter((doctor) => doctor.department === activeDepartment);

  const handleViewProfile = (doctor) => {
    navigate(`/view-doctor-profile/${doctor.id}`, { state: doctor });
  };

  return (
    <>
      <div className="app-container">
        <SideNav />
        <div className="content1">
          <div>
            <h1 className="page-title">Doctors</h1>
            <div className="department-tabs">
              {departments.map((department, index) => (
                <Button key={index} variant={activeDepartment === department ? "primary" : "outline-primary"} className="tab-button" onClick={() => setActiveDepartment(department)}>
                  {department}
                </Button>
              ))}
            </div>

            <div className="doctors-container">
              {filteredDoctors.map((doctor, index) => (
                <div key={index} className="doctor-card">
                  <img src={doctor.imgSrc} alt={doctor.name} className="doctor-image" />
                  <h3 className="doctor-name">{doctor.name}</h3>
                  <p className="doctor-role">{doctor.title}</p>
                  <p className="doctor-department">{doctor.department}</p>
                  <Button variant="info" className="view-profile-btn" onClick={() => handleViewProfile(doctor)}>
                    View Profile
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorsListPage;
