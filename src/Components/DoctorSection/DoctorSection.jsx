import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './DoctorSection.css';
import { useNavigate } from 'react-router-dom'; 

import doctor1 from "../../Images/doctor/doctor1.jpg";
import doctor2 from "../../Images/doctor/doctor2.jpg";
import doctor3 from "../../Images/doctor/doctor3.jpg";
import doctor4 from "../../Images/doctor/doctor4.jpg";

function DoctorSection() {
  const doctors = [
    { 
      department: "Dental",
      name: "Deyel Fernando",
      title: "Chief Medical Officer",
      imgSrc: doctor1,
      years: 4,
      fee:50
    },
    { 
      department: "Cardiology",
      name: "Pramodh Adhikari",
      title: "Senior Cardiologist",
      imgSrc: doctor2,
      years: 4,
      fee:50
    },
    { 
      department: "Neurology",
      name: "Merlin De Silva",
      title: "Neurosurgeon",
      imgSrc: doctor3,
      years: 4,
      fee:50
    },
    { 
      department: "Orthopedics",
      name: "Meth Medha De Mel",
      title: "Orthopedic Specialist",
      imgSrc: doctor4,
      years: 4,
      fee:50
    },
    { 
      department: "Orthopedics",
      name: "Chathurika Wimalarachci",
      title: "Orthopedic Specialist",
      imgSrc: doctor4,
      years: 4,
      fee:50
    },
    { 
      department: "Orthopedics",
      name: "Pumudi Wijerathne",
      title: "Orthopedic Specialist",
      imgSrc: doctor4,
      years: 4,
      fee:50
    },
  ];


  const [activeDepartment, setActiveDepartment] = useState("All");

  const navigate = useNavigate(); 


  const departments = ["All", ...new Set(doctors.map(doctor => doctor.department))];

  const filteredDoctors = activeDepartment === "All" 
    ? doctors 
    : doctors.filter(doctor => doctor.department === activeDepartment);


 
  const handleConsultationAppointment = (doctor) => {
    navigate(`/consultation-appointment`, { 
      state: { 
        name: doctor.name,
        imgSrc: doctor.imgSrc,
        specialization: doctor.department,  
        years: doctor.years || "10+", 
        fee: doctor.fee || "$50" 
      } 
    });
  };
  


  const handleTreatmentAppointment = (doctorName) => {
    navigate(`/treatment-appointment`, { state: { doctor: doctorName } });
  };

  



  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-8">Doctors</h1>
      <div className="department-tabs text-center mb-8">
        {departments.map((department, index) => (
          <Button
            key={index}
            variant={activeDepartment === department ? "primary" : "outline-primary"} 
            className="m-2"
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
            <Button
              variant="info"
              className="view-profile-btn"
              onClick={() => handleViewProfile(doctor)}
            >
              View Profile
            </Button>
       
            <h3 className="doctor-name">{doctor.name}</h3>
            <p className="doctor-role">{doctor.title}</p>
            <p className="text-blue-500 font-medium">{doctor.department}</p>
            <div className="button-container mt-4">
            <Button
            variant="primary"
            className="w-100 mb-2"
            onClick={() => handleConsultationAppointment(doctor)} 
            >
              Consultation Appointment
            </Button>

              <Button
                variant="success"
                className="w-100"
                onClick={() => handleTreatmentAppointment(doctor.name)}
              >
                Treatment Appointment
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default DoctorSection;