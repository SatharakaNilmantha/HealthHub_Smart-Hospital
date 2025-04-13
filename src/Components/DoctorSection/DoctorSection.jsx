import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import './DoctorSection.css';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import axios from 'axios';

import mdoctor from "../../Images/doctors/mdoctor.jpg"; // Male doctor image
import ldoctor from "../../Images/doctors/ldoctor.jpg"; // Female doctor image

function DoctorSection() {
  const [doctors, setDoctors] = useState([]);
  const [activeDepartment, setActiveDepartment] = useState("All Department");
  const [expandedDoctor, setExpandedDoctor] = useState(null);
  const navigate = useNavigate();

  const departments = ["All Department", ...new Set(doctors.map(doctor => doctor.department))];

  useEffect(() => {
    axios.get('http://localhost:8080/api/doctors/getAllDoctors')
      .then(response => {
        setDoctors(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the doctors:", error);
      });
  }, []);

  const filteredDoctors = activeDepartment === "All Department" 
    ? doctors 
    : doctors.filter(doctor => doctor.department === activeDepartment);

  const handleConsultationAppointment = (doctor) => {
    navigate(`/consultation-appointment`, { 
      state: { 
        doctorId: doctor.doctorId,  // Pass doctorId as part of the state
        name: doctor.fullName,
        imgSrc: doctor.imgSrc || (doctor.gender === "Male" ? mdoctor : ldoctor),
        description: doctor.description,
        fees: doctor.fees  
      } 
    });
  };

  const handleTreatmentAppointment = (doctor) => {
    navigate(`/treatment-appointment`, { 
      state: { 
        doctorId: doctor.doctorId,
        name: doctor.fullName,
        imgSrc: doctor.imgSrc || (doctor.gender === "Male" ? mdoctor : ldoctor),
        description: doctor.description,
        fees: doctor.fees  
      } 
    });
  };

  const handleViewProfile = (doctor) => {
    setExpandedDoctor(expandedDoctor && expandedDoctor.fullName === doctor.fullName ? null : doctor);
  };

  return (
    <>
      <div className="scroll-animation duration-2">
        <h1 className="text">Doctors</h1>
        <p style={{ textAlign: "center", marginTop: "20px", color:"#333" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>

      <div className="department-tabs text-center mb-8 scroll-animation duration-2">
        {departments.map((department, index) => (
          <Button
            key={index}
            className={`custom-button ${activeDepartment === department ? "active" : "inactive"}`}
            onClick={() => setActiveDepartment(department)}
          >
            {department}
          </Button>
        ))}
      </div>

      <div className='doctors-container scroll-animation duration-2'>
        {filteredDoctors.map((doctor) => (  
          <div key={doctor.doctorId} className='doctor-card'>
            {expandedDoctor && expandedDoctor.fullName === doctor.fullName ? (
              <div className='doctor-details'>
                <div className='image-button-container'>
                  <img 
                    src={doctor.imgSrc || (doctor.gender === "Male" ? mdoctor : ldoctor)} 
                    alt={doctor.fullName} 
                    className='doctor-image' 
                  />
                  <Button variant="info" className='view-profile-btn' onClick={() => handleViewProfile(doctor)}> Back</Button>
                </div>
                <h3 className='doctor-name'>{doctor.fullName}</h3>
                <p className='doctor-role'>{doctor.title}</p>
                <p className='doctor-department'>{doctor.department}</p>
                <div className='doctor-info'>
                  <p><strong>Description:</strong>{doctor.description}</p>
                  <p><strong>Consultation Fee:</strong> ${doctor.fees}</p>
                  <p><strong>Degree:</strong> {doctor.degree}</p>
                  <p><strong>Gender:</strong> {doctor.gender || "Not specified"}</p>
                </div>
                <div className='social-media-icons'>
                  <a href="#" className="social-icon"><FaFacebook /></a>
                  <a href="#" className="social-icon"><FaTwitter /></a>
                  <a href="#" className="social-icon"><FaLinkedin /></a>
                </div>
              </div>
            ) : (
              <>
                <div className="image-button-container">
                  <img 
                    src={doctor.imgSrc || (doctor.gender === "Male" ? mdoctor : ldoctor)} 
                    alt={doctor.fullName} 
                    className="doctor-image" 
                  />
                  <Button variant="info" className="view-profile-btn" onClick={() => handleViewProfile(doctor)}> View Profile </Button>
                </div>
                <h3 className='doctor-name'>{doctor.fullName}</h3>
                <p className='doctor-role'>{doctor.title}</p>
                <p className='doctor-department'>{doctor.department}</p>
                <div className="button-container mt-4">
                  <Button variant="primary" className="w-100 mb-2" onClick={() => handleConsultationAppointment(doctor)}>Consultation Appointment</Button>
                  <Button variant="success" className="w-100" onClick={() => handleTreatmentAppointment(doctor)}>Treatment Appointment</Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default DoctorSection;
