import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import "./DoctorsListPage.css";

import doctor1 from "../../Images/doctor/doctor1.jpg";
import doctor2 from "../../Images/doctor/doctor2.jpg";
import doctor3 from "../../Images/doctor/doctor3.jpg";
import doctor4 from "../../Images/doctor/doctor4.jpg";

function DoctorsListPage() {
  const doctors = [
    { 
      department: "Dental",
      name: "Deyel Fernando",
      title: "Chief Medical Officer",
      imgSrc: doctor1,
      yearsOfExperience: 4,
      qualification: "MBBS",
      medicalLicenceNo: 204560,
      languages: "Sinhala",
      fee: 50
    },
    { 
      department: "Cardiology",
      name: "Emma Hailey",
      title: "Senior Cardiologist",
      imgSrc: doctor2,
      yearsOfExperience: 4,
      qualification: "MBBS",
      medicalLicenceNo: 204560,
      languages: "English",
      fee: 50
    },
    { 
      department: "Neurology",
      name: "Merlin De Silva",
      title: "Neurosurgeon",
      imgSrc: doctor3,
      yearsOfExperience: 4,
      qualification: "MBBS",
      medicalLicenceNo: 204560,
      languages: "English",
      fee: 50
    },
    { 
      department: "Orthopedics",
      name: "Meth Medha De Mel",
      title: "Orthopedic Specialist",
      imgSrc: doctor4,
      yearsOfExperience: 4,
      qualification: "MBBS",
      medicalLicenceNo: 204560,
      languages: "English",
      fee: 50
    }
  ];

  const [activeDepartment, setActiveDepartment] = useState("All");
  const navigate = useNavigate();

  const departments = ["All", ...new Set(doctors.map((doctor) => doctor.department))];

  const filteredDoctors = activeDepartment === "All" 
    ? doctors 
    : doctors.filter((doctor) => doctor.department === activeDepartment);

  const handleViewProfile = (doctor) => {
    navigate(`/view-doctor-profile`, { 
      state: { 
        name: doctor.name,
        imgSrc: doctor.imgSrc,
        specialization: doctor.department,  
        years: doctor.yearsOfExperience, 
        fee: doctor.fee,
        title: doctor.title,
        qualification: doctor.qualification,
        medicalLicenceNo: doctor.medicalLicenceNo,
        languages: doctor.languages
      } 
    });
  };

  return (
    <div className="doctors-page">
      <h1 className="page-title">Doctors</h1>
      <div className="department-tabs">
        {departments.map((department, index) => (
          <Button
            key={index}
            variant={activeDepartment === department ? "primary" : "outline-primary"} 
            className="tab-button"
            onClick={() => setActiveDepartment(department)}
          >
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
            <Button 
              variant="info"
              className="view-profile-btn"
              onClick={() => handleViewProfile(doctor)}
            >
              View Profile
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorsListPage;
