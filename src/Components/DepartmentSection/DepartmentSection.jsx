import React, { useState } from "react";
import "./DepartmentSection.css"; // Import CSS file

// Import icons for each department
import { TbDental } from "react-icons/tb"; // Dentistry icon
import { PiHandHeartBold } from "react-icons/pi"; // Cardiology icon
import { MdHearing } from "react-icons/md"; // ENT Specialist icon
import { LuBrain } from "react-icons/lu"; // Neurology icon
import { TbStethoscope } from "react-icons/tb";; // Psychiatry & Radiology icon

// Import department images
import departmentImage1 from "../../Images/department/1.jpg";
import departmentImage2 from "../../Images/department/2.jpg";
import departmentImage3 from "../../Images/department/3.jpg";
import departmentImage4 from "../../Images/department/4.jpg";
import departmentImage5 from "../../Images/department/5.jpg";
import departmentImage6 from "../../Images/department/6.jpg";

function DepartmentSection() {
  // Set default department to Dentistry
  const [selectedDepartment, setSelectedDepartment] = useState({
    id: 1,
    name: "Dentistry",
    description:
      "Dentistry is the branch of medicine that deals with the diagnosis, prevention, and treatment of conditions related to the teeth and gums. Our dental department is equipped with state-of-the-art technology to provide the best care.",
    image: departmentImage1,
    icon: <TbDental />,
  });

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
        "Cardiology focuses on diagnosing and treating heart-related conditions. Our cardiology department offers comprehensive care with advanced diagnostic and therapeutic techniques.",
      image: departmentImage2,
      icon: <PiHandHeartBold />,
    },
    {
      id: 3,
      name: "ENT Specialists",
      description:
        "Our ENT specialists treat disorders related to the ears, nose, and throat. We offer specialized care for a wide range of conditions affecting these vital organs.",
      image: departmentImage3,
      icon: <MdHearing />,
    },
    {
      id: 4,
      name: "Psychiatry",
      description:
        "Psychiatry focuses on diagnosing and treating mental health conditions. Our psychiatry department offers expert counseling and medical treatments to support mental well-being.",
      image: departmentImage4,
      icon: <TbStethoscope />,
    },
    {
      id: 5,
      name: "Neurology",
      description:
        "Neurology is the study of the nervous system and its disorders. Our neurology department specializes in treating brain and nervous system conditions.",
      image: departmentImage5,
      icon: <LuBrain />,
    },
    {
      id: 6,
      name: "Radiology",
      description:
        "Radiology is the medical discipline that uses imaging techniques to diagnose and treat diseases. Our radiology department is equipped with modern imaging technology.",
      image: departmentImage6,
      icon: <TbStethoscope />,
    },
  ];

  // Handle department selection
  const handleDepartmentClick = (department) => {
    setSelectedDepartment(department);
  };

  return (
    <div className="department-container">
      <h1>Departments</h1>
      <p className="department-description">
        Explore our specialized medical departments, each dedicated to providing top-quality healthcare.
      </p>

      {/* Department List */}
      <div className="department-list">
        {departments.map((department) => (
          <div
            key={department.id}
            className="department-item"
            onClick={() => handleDepartmentClick(department)}
          >
            {department.name}
            <div className="department-icon">{department.icon}</div> {/* Display icon below name */}
          </div>
        ))}
      </div>

      {/* Selected Department Details */}
      {selectedDepartment && (
        <div className="department-details">
          <div className="department-description-section">
            <img
              src={selectedDepartment.image}
              alt={selectedDepartment.name}
              className="department-image"
            />
            <div className="department-text">
              <h2>{selectedDepartment.name}</h2>
              <p>{selectedDepartment.description}</p>
              <button className="appointment-button">Make An Appointment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DepartmentSection;
