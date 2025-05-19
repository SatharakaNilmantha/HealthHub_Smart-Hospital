import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import './App.css';
import SideNav from "./components/SideNav/SideNav";
import { FaCalendarCheck, FaUserMd, FaUserInjured, FaStethoscope } from "react-icons/fa"; // Import React Icons
import PopupMessage from "./Components/PopupMessage/popupMessage";


function App() {
  
  const [appointments, setAppointments] = useState([]);
  const [popup, setPopup] = useState({ type: "", message: "" }); // State for popup message
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const [pendingCount, setPendingCount] = useState(0); // State for pending appointment count
  const [acceptedCount, setAcceptedCount] = useState(0); // State for accepted appointment count


  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [doctorCount, setDoctorCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  const [error, setError] = useState(null);
  
  // Fetch appointments , doctors and departments when component mounts
  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
    fetchDepartments();

  }, []);
//------------------------------------------------------------------------------------------------//  
  // Fetch appointments and update the state
  const fetchAppointments = async () => {
    try {
      // Fetch all appointments
      const response = await axios.get("http://localhost:8080/api/appointments/getAppointments");
      const appointmentsData = response.data;
  
      // Filter pending and accepted appointments
      const pendingAppointments = appointmentsData.filter(app => app.state === "pending");
      const acceptedAppointments = appointmentsData.filter(app => app.state === "accepted");
  
      // Update the counts
      setPendingCount(pendingAppointments.length);
      setAcceptedCount(acceptedAppointments.length);
  
      // Log counts
      console.log(`Pending Appointments: ${pendingAppointments.length}`);
      console.log(`Accepted Appointments: ${acceptedAppointments.length}`);
  
      // Fetch doctor and patient details for each pending appointment
      const appointmentsWithDetails = await Promise.all(
        pendingAppointments.map(async (appointment) => {
          try {
            // Fetch doctor details
            const doctorResponse = await axios.get(`http://localhost:8080/api/doctors/${appointment.doctorId}`);
            const doctorDetails = doctorResponse.data;
  
            // Fetch patient details
            const patientResponse = await axios.get(`http://localhost:8080/api/patient/${appointment.patientId}`);
            const patientDetails = patientResponse.data;
  
            // Return appointment with doctor and patient details
            return {
              ...appointment,
              doctorDetails,
              patientDetails,
            };
          } catch (error) {
            console.error(`Error fetching details for appointment ${appointment.appointmentId}:`, error);
            return {
              ...appointment,
              doctorDetails: null,
              patientDetails: null,
            };
          }
        })
      );
  
      // Set only the pending appointments with details
      setAppointments(appointmentsWithDetails);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };
  
  // Handle accepting an appointment
  const handleAccept = async (appointmentId) => {
    setPopup({ type: "hidden", message: "" });
  
    if (window.confirm("Are you sure you want to accept this appointment?")) {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/appointments/${appointmentId}`, 
          { state: "accepted" }
        );
  
        // Remove the accepted appointment from the list
        setAppointments(appointments.filter(app => app.appointmentId !== appointmentId));
  
        // Update the counts
        setPendingCount(pendingCount - 1); // Decrease pending count
        setAcceptedCount(acceptedCount + 1); // Increase accepted count
  
        // Log the new counts
        console.log(`Pending Appointments: ${pendingCount - 1}`);
        console.log(`Accepted Appointments: ${acceptedCount + 1}`);
  
        setPopup({ type: "success", message: response.data }); // Show success message
      } catch (error) {
        setPopup({ type: "error", message: "Failed to update appointment." });
      }
    }
  };
  
  // Handle canceling an appointment
  const handleCancel = async (appointmentId) => {
    setPopup({ type: "hidden", message: "" });
  
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        const response = await axios.delete(`http://localhost:8080/api/appointments/${appointmentId}`);
        
        // Remove the canceled appointment from the list
        setAppointments(appointments.filter(app => app.appointmentId !== appointmentId));
  
        // Update the counts
        setPendingCount(pendingCount - 1); // Decrease pending count
  
        // Log the new counts
        console.log(`Pending Appointments: ${pendingCount - 1}`);
        console.log(`Accepted Appointments: ${acceptedCount}`);
  
        setPopup({ type: "success", message: response.data }); // Show success message
      } catch (error) {
        setPopup({ type: "error", message: "Failed to delete appointment." });
      }
    }
  };
//-------------------------------------------------------------------------------------//
   // Fetch doctors from the API
   const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/doctors/getAllDoctors');
      setDoctors(response.data);
      setDoctorCount(response.data.length);  // Set the count of doctors
    } catch (err) {
      setError('Error fetching doctors');
      console.error(err);
    }
  };

  // Fetch departments from the API
  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/departments/getDepartments');
      setDepartments(response.data);
      setDepartmentCount(response.data.length);  // Set the count of departments
    } catch (err) {
      setError('Error fetching departments');
      console.error(err);
    }
  };
//----------------------------------------------------------------------------------------//
  const filteredAppointments = appointments.filter((appointment) => {
    // Safely access doctor's name and handle null or undefined values
    const doctorName = appointment.doctorDetails?.fullName.toLowerCase() || "";
    
    // Safely format the appointment date-time, ensuring the field exists
    const appointmentDateTime = appointment.appointmentDateTime
      ? new Date(appointment.appointmentDateTime).toLocaleString()
      : "";
    
    const appointmentType = appointment.type || ""; // Ensure it's a valid string
  
    // Perform the search query match
    return (
      doctorName.includes(searchQuery.toLowerCase()) ||
      appointmentDateTime.includes(searchQuery) ||
      appointmentType.toLowerCase().includes(searchQuery.toLowerCase()) // Added appointmentType filtering
    );
  });
  



  return (
    <>
      <div className="app-container">
        <SideNav />
        <div className="content">
          <div>
            <h1 className="dashboard-title">Welcome to HealthHub Medical Center</h1>
            <p className="dashboard-description">Manage your Departments, Doctors, and Employees seamlessly</p>

            {/* Cards Section */}
            <div className="cards-container">
              {/* Card 1: Active Appointments */}
              <div className="card">
                <div className="card-icon">
                  <FaCalendarCheck size={40} color="#007bff" />
                </div>
                <div className="card-content">
                  <h3>Active Appointments</h3>
                  <p>{pendingCount}</p>
                  <span>Scheduled for Today</span>
                </div>
              </div>

              {/* Card 2: Total Doctors */}
              <div className="card">
                <div className="card-icon">
                  <FaUserMd size={40} color="#28a745" />
                </div>
                <div className="card-content">
                  <h3>Total Doctors</h3>
                  <p>{doctorCount}</p>
                  <span>Currently Registered</span>
                </div>
              </div>

              {/* Card 3: Registered Patients */}
              <div className="card">
                <div className="card-icon">
                  <FaUserInjured size={40} color="#dc3545" />
                </div>
                <div className="card-content">
                  <h3>Registered Patients</h3>
                  <p>{acceptedCount}</p>
                  <span>Total Registered Patients</span>
                </div>
              </div>

              {/* Card 4: Available Departments */}
              <div className="card">
                <div className="card-icon">
                  <FaStethoscope size={40} color="#ffc107" />
                </div>
                <div className="card-content">
                  <h3>Available Departments</h3>
                  <p>{departmentCount}</p>
                  <span>Currently Active</span>
                </div>
              </div>
            </div>

            <div className="search-bar">
              <input
                type="text"
                placeholder="Search by Doctor Name or Date/Time or Appointment"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>


            {/* Table Section */}
            <div className="action-table">
              <h3>Latest Booking Appointments</h3>
              <table>
                <thead>
                  <tr>
                    <th>Doctor Name</th>
                    <th>Patient Name</th>
                    <th>Appointment Date & Time</th>
                    <th>Appointment Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment) => (
                      <tr key={appointment.appointmentId}>
                        <td>{appointment.doctorDetails.fullName}</td>
                        <td>{appointment.patientDetails.fullName}</td>
                        <td>{appointment.appointmentDateTime? new Date(appointment.appointmentDateTime).toLocaleDateString() +" " +new Date(appointment.appointmentDateTime).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: true,  }) : "N/A"}</td>
                        <td>{appointment.type}</td>
                        <td>{appointment.state}</td>
                        <td>
                          <>
                            <button
                              className="accept-btn"
                              onClick={() => handleAccept(appointment.appointmentId)}
                            >
                              Accept
                            </button>
                            <button
                              className="cancel-btn"
                              onClick={() => handleCancel(appointment.appointmentId)}
                            >
                              Cancel
                            </button>
                          </>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center" }}>
                        No Latest Booking Appointments found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <PopupMessage type={popup.type} message={popup.message} /> {/* Popup message */}
    </>
  );
}

export default App;