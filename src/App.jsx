import React from "react";
import './App.css';
import SideNav from "./components/SideNav/SideNav";
import { FaCalendarCheck, FaUserMd, FaUserInjured, FaStethoscope } from "react-icons/fa"; // Import React Icons

function App() {
  const appointments = [
    { id: 1, patientName: "John Doe", doctorName: "Dr. Emily Clark", appointmentTime: "10:00 AM", status: "Pending" },
    { id: 2, patientName: "Jane Smith", doctorName: "Dr. Robert Lee", appointmentTime: "11:30 AM", status: "Pending" },
    { id: 3, patientName: "Michael Johnson", doctorName: "Dr. Sarah Brown", appointmentTime: "1:00 PM", status: "Pending" },
  ];

  const handleAccept = (id) => {
    confirm(`Appointment for ${id} accepted.`);
    // Add functionality to update status in your database
  };

  const handleCancel = (id) => {
    confirm(`Appointment for ${id} canceled.`);
    // Add functionality to update status in your database
  };

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
                  <p>120</p>
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
                  <p>45</p>
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
                  <p>1,532</p>
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
                  <p>12</p>
                  <span>Currently Active</span>
                </div>
              </div>
            </div>

            {/* Table Section */}
            <div className="action-table">
              <h3>Latest Booking Appointments</h3>
              <table>
                <thead>
                  <tr>
                    <th>Doctor Name</th>
                    <th>Appointment Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>{appointment.doctorName}</td>
                      <td>{appointment.appointmentTime}</td>
                      <td>{appointment.status}</td>
                      <td>
                        <button className="accept-btn" onClick={() => handleAccept(appointment.id)}>View</button>
                        <button className="cancel-btn" onClick={() => handleCancel(appointment.id)}>Cancel</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;