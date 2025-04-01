import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SideNav from "../../Components/SideNav/SideNav.jsx";
import axios from "axios";
import "./DoctorsListPage.css";
import mdoctor from '../../Images/doctor/mdoctor.jpg';
import ldoctor from '../../Images/doctor/ldoctor.jpg';

function DoctorsListPage() {
  const [doctors, setDoctors] = useState([]);
  const [activeDepartment, setActiveDepartment] = useState("All Department");
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const navigate = useNavigate();

  // Fetch doctors from the backend API when the component mounts
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/doctors/getAllDoctors");
        setDoctors(response.data); // Set doctors data in state
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctors();
  }, []);

  const departments = ["All Department", ...new Set(doctors.map((doctor) => doctor.department))];

  // Filter doctors based on department and search query
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesDepartment = activeDepartment === "All Department" || doctor.department === activeDepartment;
    const matchesSearchQuery = searchQuery === "" || 
                               (doctor.fullName && doctor.fullName.toLowerCase().includes(searchQuery.toLowerCase())) || 
                               (doctor.title && doctor.title.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesDepartment && matchesSearchQuery;
  });

  const handleViewProfile = (doctor) => {
    navigate(`/view-doctor-profile/${doctor.doctorId}`, { state: doctor });
  };

  const handleDepartmentSelect = (department) => {
    setActiveDepartment(department);
  };


  return (
    <div className="app-container">
      <SideNav />
      <div className="content1">
        <div>
          <div className="header">
            <h1 className="dashboard-title">HealthHub Medical Center</h1>

            {/* Department Selection Dropdown */}
            <div className="department-dropdown">
              <h2>Select Department</h2>
              <select value={activeDepartment}onChange={(e) => setActiveDepartment(e.target.value)}>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

     
        {/* Search Bar */}
         <div className="search-container">
          <input type="text"className="search-input1"placeholder="Search by Doctor or Title..."value={searchQuery}onChange={(e) => setSearchQuery(e.target.value)}/>
          </div>

          {/* Display the filtered doctors */}
          <div className="doctors-container">
            {filteredDoctors.map((doctor, index) => {
              const defaultImageUrl = doctor.gender === "Female" ? ldoctor : mdoctor;

              return (
                <div key={index} className="doctor-card">
                  <img
                    src={doctor.imageUrl || defaultImageUrl}
                    alt={doctor.fullName || "Doctor"}
                    className="doctor-image"
                    onError={(e) => (e.target.src = defaultImageUrl)} // Fallback to gender-based default image
                  />
                  <h3 className="doctor-name">{doctor.fullName}</h3>
                  <p className="doctor-department">{doctor.title}</p>
                  <div className="buttongroup1">
                    <Button className="view-button1" onClick={() => handleViewProfile(doctor)}>View Profile</Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorsListPage;
