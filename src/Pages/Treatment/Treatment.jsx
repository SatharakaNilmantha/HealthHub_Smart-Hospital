import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure axios is imported
import SideNav from "../../Components/SideNav/SideNav";
import dayjs from "dayjs"; // Make sure dayjs is imported
import { FaCheck, FaTimes } from 'react-icons/fa';  // Import the required icons
import "./Treatment.css";

const Treatment = () => {
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "");
  const [doctorId, setDoctorId] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [patientsDetails, setPatientsDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // New state for the search term

  useEffect(() => {
    if (userEmail) {
      axios.get(`http://localhost:8080/api/doctors/getDoctorByEmail/${userEmail}`)
        .then(response => {
          setDoctorId(response.data.doctorId);
        })
        .catch(error => console.error("Error fetching doctor ID:", error));
    }
  }, [userEmail]);

  const fetchAppointments = () => {
    if (doctorId) {
      axios.get(`http://localhost:8080/api/appointments/getAppointmentsByDoctor/${doctorId}`)
        .then(response => {
          setAppointments(response.data);  
        })
        .catch(error => console.error("Error fetching appointments:", error));
    }
  };

  useEffect(() => {
    fetchAppointments();  
  }, [doctorId]);

  useEffect(() => {
    const patientIds = appointments.map(app => app.patientId);
    if (patientIds.length > 0) {
      Promise.all(patientIds.map(id => axios.get(`http://localhost:8080/api/patient/${id}`)))
        .then(responses => {
          setPatientsDetails(responses.map(res => res.data));
        })
        .catch(error => console.error("Error fetching patient details:", error));
    }
  }, [appointments]);

  // Filter only completed and canceled appointments
  const filteredAppointments = appointments
    .map(appointment => ({
      ...appointment,
      patientData: patientsDetails.find(patient => patient.patientId === appointment.patientId),
    }))
    .filter(appointment => 
      ((appointment.state === "completed" || appointment.state === "canceled") && appointment.type === "treatment")
    )
    .filter(appointment => 
      // Filter by search term in patient name or appointment date/time
      appointment.patientData?.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dayjs(appointment.appointmentDateTime).format("YYYY-MM-DD HH:mm").includes(searchTerm)
    )
    .sort((a, b) => dayjs(a.appointmentDateTime).diff(dayjs(b.appointmentDateTime)));

  // Count the number of completed and canceled appointments
  const completedCount = filteredAppointments.filter(app => app.state === "completed").length;
  const canceledCount = filteredAppointments.filter(app => app.state === "canceled").length;

  return (

    <>
    <div className="app-container">
      <SideNav />
      <div className="content">

        <h1 className="dashboard-title">Treatment Sessions</h1>
        <p className="dashboard-description">Manage your completed and canceled treatment sessions</p>

        <div className="appo-state">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by Patient Name or Date/Time or Appointment"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Display Counts */}
          <div className="appointment-counts">
          <p className="completed">Completed Appointments: {completedCount}</p>
          <p className="canceled">Canceled Appointments: {canceledCount}</p>
          </div>
        </div>

        {/* Table Section */}
        <div className="action-table1">
          <h3>Completed and Canceled Appointments</h3>
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Appointment Date & Time</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map(appointment => (
                  <tr
                    key={appointment.appointmentId}
                    className={appointment.state === "completed" ? "completed" : appointment.state === "canceled" ? "canceled" : ""}
                  >
                    <td>{appointment.patientData?.fullName || 'N/A'}</td>
                    <td>{appointment.patientData?.gender || 'N/A'}</td>
                    <td>{appointment.patientData?.dob || 'N/A'}</td>
                    <td>{appointment.appointmentDateTime? new Date(appointment.appointmentDateTime).toLocaleDateString() +" " +new Date(appointment.appointmentDateTime).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: true,  }) : "N/A"}</td>
                    <td>{appointment.type}</td>
                    <td>{appointment.state === "completed" ? ( <FaCheck style={{ color: 'green' }} /> ) : appointment.state === "canceled" ? (<FaTimes style={{ color: 'red' }} /> ) : ( "" )}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No Completed or Canceled Appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
   </>
  );
};

export default Treatment;

