import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import SideNav from "./Components/SideNav/SideNav";
import { FaCalendarCheck,FaCalendarPlus} from "react-icons/fa"; 
import { FaCalendarXmark ,FaSackDollar } from "react-icons/fa6";

import dayjs from "dayjs";

function App() {
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "");
  const [doctorId, setDoctorId] = useState(null);
  const [doctorFees, setDoctorFees] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [patientsDetails, setPatientsDetails] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [canceledCount, setCanceledCount] = useState(0);
  const [totalFeesToday, setTotalFeesToday] = useState(0);

  useEffect(() => {
    if (userEmail) {
      axios.get(`http://localhost:8080/api/doctors/getDoctorByEmail/${userEmail}`)
        .then(response => {
          setDoctorId(response.data.doctorId);
          setDoctorFees(response.data.fees);  
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

  const today = dayjs().startOf("day");

  const acceptedAppointmentsToday = appointments
    .map(appointment => ({
      ...appointment,
      patientData: patientsDetails.find(patient => patient.patientId === appointment.patientId),
    }))
    .filter(appointment => 
      dayjs(appointment.appointmentDateTime).isSame(today, "day") && appointment.state !== "canceled" && appointment.state !== "completed"
    )
    .sort((a, b) => dayjs(a.appointmentDateTime).diff(dayjs(b.appointmentDateTime)));



  

  const canceledAppointmentsToday = appointments.filter(app => 
    dayjs(app.appointmentDateTime).isSame(today, "day") && app.state === "canceled"
  );

  const completedAppointmentsToday = appointments.filter(app => 
    dayjs(app.appointmentDateTime).isSame(today, "day") && app.state === "completed"
  );

  useEffect(() => {
    setCompletedCount(completedAppointmentsToday.length);
    setCanceledCount(canceledAppointmentsToday.length);

    const totalFees = completedAppointmentsToday.reduce((total, appointment) => {
      return total + (doctorFees || 0);
    }, 0);

    setTotalFeesToday(totalFees);
  }, [completedAppointmentsToday, canceledAppointmentsToday, doctorFees]);

  const handleCompleted = async (appointmentId) => {
    if (window.confirm("Are you sure you want to complete this appointment?")) {
      try {
        await axios.put(`http://localhost:8080/api/appointments/${appointmentId}`, { state: "completed" });

        // Remove completed appointment from acceptedAppointmentsToday list
        setAppointments(prevAppointments =>
          prevAppointments.filter(app => app.appointmentId !== appointmentId)
        );
        fetchAppointments(); 
      } catch (error) {
        console.error("Failed to complete appointment:", error);
      }
    }
  };

  const handleCancel = async (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        await axios.put(`http://localhost:8080/api/appointments/${appointmentId}`, { state: "canceled" });

        // Remove canceled appointment from acceptedAppointmentsToday list
        setAppointments(prevAppointments =>
          prevAppointments.filter(app => app.appointmentId !== appointmentId)
        );
        fetchAppointments();  
      } catch (error) {
        console.error("Failed to cancel appointment:", error);
      }
    }
  };

  return (
    <div className="app-container">
      <SideNav />
      <div className="content">
        <h1 className="dashboard-title">Welcome to HealthHub Medical Center</h1>
        <p className="dashboard-description">Efficiently manage and schedule your patients' appointments with ease. Keep track of upcoming visits and ensure seamless care for every patient.</p>


        {/* Cards Section */}
        <div className="cards-container">
          {/* Card 1: Active Appointments */}
          <div className="card">
            <div className="card-icon">
              < FaCalendarPlus size={40} color="#007bff" />
            </div>
            <div className="card-content">
              <h3>Active Appointments</h3>
              <p>{acceptedAppointmentsToday.length}</p>
              <span>Scheduled for Today</span>
            </div>
          </div>

          {/* Card 2: Total Doctors */}
          <div className="card">
            <div className="card-icon">
              <FaCalendarCheck  size={40} color="#28a745" />
            </div>
            <div className="card-content">
              <h3>Completed Appointment</h3>
              <p>{completedCount}</p>
              <span>Scheduled for Today</span>
            </div>
          </div>

          {/* Card 3: Registered Patients */}
          <div className="card">
            <div className="card-icon">
              <FaCalendarXmark   size={38} color="#dc3545" />
            </div>
            <div className="card-content">
              <h3>Canceled Appointment</h3>
              <p>{canceledCount}</p>
              <span>Scheduled for Today</span>
            </div>
          </div>

          {/* Card 4: Available Departments */}
          <div className="card">
            <div className="card-icon">
              <FaSackDollar   size={40} color="#ffc107" />
            </div>
            <div className="card-content">
              <h3>Total Fees</h3>
              <p>$ {totalFeesToday.toFixed(2)}</p>
              <span>Collected Today</span>
            </div>
          </div>
        </div>


        <div className="action-table">
          <h3>Accepted Appointments Today</h3>
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Appointment Date & Time</th>
                <th>Status</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {acceptedAppointmentsToday.length > 0 ? (
                acceptedAppointmentsToday.map(appointment => (
                  <tr key={appointment.appointmentId}>
                    <td>{appointment.patientData?.fullName || 'N/A'}</td>
                    <td>{appointment.patientData?.gender || 'N/A'}</td>
                    <td>{appointment.patientData?.dob || 'N/A'}</td>
                    <td>{appointment.appointmentDateTime? new Date(appointment.appointmentDateTime).toLocaleDateString() +" " +new Date(appointment.appointmentDateTime).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: true,  }) : "N/A"}</td>
                    <td>{appointment.state}</td>
                    <td>{appointment.type}</td>
                    <td>
                      <button className="accept-btn" onClick={() => handleCompleted(appointment.appointmentId)}>
                        Confirm
                      </button>
                      <button className="cancel-btn" onClick={() => handleCancel(appointment.appointmentId)}>
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No Latest Booking Appointments found.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
