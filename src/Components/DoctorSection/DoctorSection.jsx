import React, { useEffect,useState } from 'react';
import { Button } from 'react-bootstrap';
import './DoctorSection.css';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

import doctor1 from "../../Images/doctors/doctors-1.jpg";
import doctor2 from "../../Images/doctors/doctors-2.jpg";
import doctor3 from "../../Images/doctors/doctors-3.jpg";
import doctor4 from "../../Images/doctors/doctors-4.jpg";


function DoctorSection() {
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
      name: "Pramodh Adhikari",
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
    },
    { 
      department: "Orthopedics",
      name: "Chathurika Wimalarachci",
      title: "Orthopedic Specialist",
      imgSrc: doctor4,
      yearsOfExperience: 4,
      qualification: "MBBS",
      medicalLicenceNo: 204560,
      languages: "Tamil",
      fee: 50
    },
    { 
      department: "Orthopedics",
      name: "Pumudi Wijerathne",
      title: "Orthopedic Specialist",
      imgSrc: doctor4,
      yearsOfExperience: 4,
      qualification: "MBBS",
      medicalLicenceNo: 204560,
      languages: "English",
      fee: 50
    },
    
    
  ];

  const [activeDepartment, setActiveDepartment] = useState("All");
  const [expandedDoctor, setExpandedDoctor] = useState(null);
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
        years: doctor.yearsOfExperience , 
        fee: doctor.fee 
      } 
    });
  };

  const handleTreatmentAppointment = (doctor) => {
    navigate(`/treatment-appointment`, { 
      state: { 
        name: doctor.name,
        imgSrc: doctor.imgSrc,
        specialization: doctor.department,  
        years: doctor.yearsOfExperience , 
        fee: doctor.fee  
      } 
    });
  };
  

  const handleViewProfile = (doctor) => {
    if (expandedDoctor && expandedDoctor.name === doctor.name) {
      setExpandedDoctor(null); 
    } else {
      setExpandedDoctor(doctor);
    }
  };


  //----------------------------------scroll direction code ------------------------------------//
  
  // IntersectionObserver to trigger animation when elements come into the viewport
     useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-up');
          observer.unobserve(entry.target); // Stop observing after animation
        }
      });
    }, {
      threshold: 0.1 // Trigger when 10% of the element is in the viewport
    });
  
    // Observe all the elements with the 'scroll-animation' class
    const animatedDivs = document.querySelectorAll('.scroll-animation');
  
    animatedDivs.forEach(div => {observer.observe(div);});
    
    return () => {
      observer.disconnect(); // Clean up observer on component unmount
    };
     }, []);
  

  return (
    <>

      {/*--------------------------------------title section -------------------------------------------------*/}
      <div className="scroll-animation duration-2">
        <h1 className="text  ">Doctors</h1>
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
          aspernatur qui molestiae minus at soluta quaerat, officiis minima
          placeat nisi voluptatibus
        </p>
      </div>

      <div className="department-tabs text-center mb-8  scroll-animation duration-2">
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

      <div className='doctors-container scroll-animation duration-2' >
        {filteredDoctors.map((doctor, index) => (  
          <div key={index} className='doctor-card ' >
            {expandedDoctor && expandedDoctor.name === doctor.name ? (
              <div className='doctor-details '>
                <div className='image-button-container'>
                  <img src={doctor.imgSrc} alt={doctor.name} className='doctor-image' />
                  <Button
                    variant="info"
                    className='view-profile-btn'
                    onClick={() => handleViewProfile(doctor)}
                  >
                    Back
                  </Button>
                </div>
                <h3 className='doctor-name'>{doctor.name}</h3>
                <p className='doctor-role'>{doctor.title}</p>
                <p className='text-blue-500 font-medium'>{doctor.department}</p>
                <div className='doctor-info'>
                  <p><strong>Years of Experience:</strong> {doctor.yearsOfExperience}</p>
                  <p><strong>Consultation Fee:</strong> ${doctor.fee}</p>
                  <p><strong>Qualifications:</strong> {doctor.qualification}</p>
                  <p><strong>Medical License Number:</strong> {doctor.medicalLicenceNo}</p>
                  <p><strong>Languages Spoken:</strong> {doctor.languages}</p>
                </div>
                <div className='social-media-icons'>
                  <a href="#" className="social-icon">
                    <FaFacebook />
                  </a>
                  <a href="#" className="social-icon">
                    <FaTwitter />
                  </a>
                  <a href="#" className="social-icon">
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            ) : (

              <>
                <div className="image-button-container ">
                  <img src={doctor.imgSrc} alt={doctor.name} className="doctor-image" />
                  <Button
                    variant="info"
                    className="view-profile-btn"
                    onClick={() => handleViewProfile(doctor)}
                  >
                    View Profile
                  </Button>
                </div>
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
                    onClick={() => handleTreatmentAppointment(doctor)}
                  >
                    Treatment Appointment
                  </Button>
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