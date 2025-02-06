import React, { useState, useEffect } from "react";
import "./DepartmentSection.css"; // Import CSS file

// Import icons for each department
import { TbDental } from "react-icons/tb"; // Dentistry icon
import { PiHandHeartBold } from "react-icons/pi"; // Cardiology icon
import { MdHearing } from "react-icons/md"; // ENT Specialist icon
import { LuBrain } from "react-icons/lu"; // Neurology icon
import { TbStethoscope } from "react-icons/tb"; // Psychiatry & Radiology icon

// Import department images
import departmentImage1 from "../../Images/department/1.jpg";
import departmentImage2 from "../../Images/department/2.jpg";
import departmentImage3 from "../../Images/department/3.jpg";
import departmentImage4 from "../../Images/department/4.jpg";
import departmentImage5 from "../../Images/department/5.jpg";
import departmentImage6 from "../../Images/department/6.jpg";

function DepartmentSection() {
  // Set default department to Dentistry
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // Department data with icons
  const departments = [
    {
      id: 1,
      name: "Dentistry",
      description:
        "Dentistry is the branch of medicine that deals with the diagnosis, prevention, and treatment of conditions related to the teeth and gums. Our dental department is equipped with state-of-the-art technology to provide the best care.",
      image: departmentImage1,
      icon: <TbDental />,
    },
    {
      id: 2,
      name: "Cardiology",
      description:
        "Cardiology focuses on diagnosing and treating heart-related conditions. Our cardiology department offers comprehensive care with advanced diagnostic and therapeutic techniques.Our department is equipped with state-of-the-art technology to provide the best care.",
      image: departmentImage2,
      icon: <PiHandHeartBold />,
    },
    {
      id: 3,
      name: "ENT Specialists",
      description:
        "Our ENT specialists treat disorders related to the ears, nose, and throat. We offer specialized care for a wide range of conditions affecting these vital organs.Our  department is equipped with state-of-the-art technology to provide the best care.",
      image: departmentImage3,
      icon: <MdHearing />,
    },
    {
      id: 4,
      name: "Psychiatry",
      description:
        "Psychiatry focuses on diagnosing and treating mental health conditions. Our psychiatry department offers expert counseling and medical treatments to support mental well-being.Our department is equipped with state-of-the-art technology to provide the best care.",
      image: departmentImage4,
      icon: <TbStethoscope />,
    },
    {
      id: 5,
      name: "Neurology",
      description:
        "Neurology is the study of the nervous system and its disorders. Our neurology department specializes in treating brain and nervous system conditions.Our department is equipped with state-of-the-art technology to provide the best care.",
      image: departmentImage5,
      icon: <LuBrain />,
    },
    {
      id: 6,
      name: "Radiology",
      description:
        "Radiology is the medical discipline that uses imaging techniques to diagnose and treat diseases. Our radiology department is equipped with modern imaging technology.Our department is equipped with state-of-the-art technology to provide the best care.",
      image: departmentImage6,
      icon: <TbStethoscope />,
    },
  ];

  // Set the default department on initial load
  useEffect(() => {
    setSelectedDepartment(departments[0]);
  }, []);

  // Handle department selection
  const handleDepartmentClick = (department) => {
    setSelectedDepartment(department);
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
    <div className="department-container">
      {/*--------------------------------------title section -------------------------------------------------*/}
      <div className="scroll-animation">
        <h1 className="text  ">Department</h1>
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
          aspernatur qui molestiae minus at soluta quaerat, officiis minima
          placeat nisi voluptatibus
        </p>
      </div>

      {/* Department List */}
      <div className="department-list scroll-animation duration-2">
        {departments.map((department) => (
          <div key={department.id} className={`department-item ${selectedDepartment?.id === department.id ? "selected" : ""}`}
            onClick={() => handleDepartmentClick(department)}
          >
            <div className={`department-icon ${selectedDepartment?.id === department.id ? "selected" : ""}`}>{department.icon}</div> {/* Display icon below name */}
            <div>{department.name}</div>
          </div>
        ))}
      </div>

      {/* Selected Department Details */}
      <div className="scroll-animation duration-2">
      {selectedDepartment && (
        <div className="department-details  ">
          <div className="department-description-section ">
            <div>
              <img
                className="department-image "
                src={selectedDepartment.image}
                alt={selectedDepartment.name}
              />
            </div>
            <div className="department-text">
              <h2>{selectedDepartment.name}</h2>
              <p>{selectedDepartment.description}</p>
              <button className="appointment-button">Make An Appointment</button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default DepartmentSection;
