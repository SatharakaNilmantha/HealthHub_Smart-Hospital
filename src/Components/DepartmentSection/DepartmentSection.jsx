import React, { useState } from 'react'
import './DepartmentSection.css'; // Import the CSS file for styling

// Import images for each department
import departmentImage1 from '../../Images/department/1.jpg';
import departmentImage2 from '../../images/department/2.jpg';
import departmentImage3 from '../../images/department/3.jpg';
import departmentImage4 from '../../images/department/4.jpg';
import departmentImage5 from '../../images/department/5.jpg';
import departmentImage6 from '../../images/department/6.jpg';

function DepartmentSection() {
  // State to track the selected department
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // Department data
  const departments = [
    {
      id: 1,
      name: 'Dentistry',
      description:
        'Dentistry is the branch of medicine that deals with the diagnosis, prevention, and treatment of conditions related to the teeth and gums. Our dental department is equipped with state-of-the-art technology to provide the best care.',
      image: departmentImage1,
    },
    {
      id: 2,
      name: 'Cardiology',
      description:
        'Cardiology focuses on diagnosing and treating heart-related conditions. Our cardiology department offers comprehensive care with advanced diagnostic and therapeutic techniques.',
      image: departmentImage2, // Same image for all departments
    },
    {
      id: 3,
      name: 'ENT Specialists',
      description:
        'Our ENT specialists treat disorders related to the ears, nose, and throat. We offer specialized care for a wide range of conditions affecting these vital organs.',
      image: departmentImage3, // Same image for all departments
    },
    {
      id: 4,
      name: 'Psychiatry',
      description:
        'Astrology is the study of celestial bodies’ movements and positions. Our astrology department offers insights based on astrological readings and predictions.',
      image: departmentImage4, // Same image for all departments
    },
    {
      id: 5,
      name: 'Neurology',
      description:
        'Neuroanatomy is the study of the structure of the nervous system. Our neuroanatomy department provides detailed education and research opportunities in the field of brain and nervous system anatomy.',
      image: departmentImage5, // Same image for all departments
    },
    {
      id: 6,
      name: 'Radiology',
      description:
        'Our blood screening department offers a wide range of diagnostic tests to detect and monitor various health conditions, ensuring timely and accurate results.',
      image: departmentImage6, // Same image for all departments
    },
  ];

  // Handle department click
  const handleDepartmentClick = (department) => {
    setSelectedDepartment(department);
  };

  return (
    <div className="department-container">
      <h1>Departments</h1>
      <p className="department-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
      </p>

      <div className="department-list">
        {departments.map((department) => (
          <div
            key={department.id}
            className="department-item"
            onClick={() => handleDepartmentClick(department)}
          >
            {department.name}
          </div>
        ))}
      </div>

      {/* Display selected department details */}
      {selectedDepartment && (
        <div className="department-details">
          <div className="department-description-section">
            <img
              src={selectedDepartment.image}
              alt={selectedDepartment.name}
              className="department-image"
            />
            <div className="department-text">
              <h2>Dentist with surgical mask holding scaler near patient</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
              </p>
              <button className="appointment-button">Make An Appointment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}

export default DepartmentSection