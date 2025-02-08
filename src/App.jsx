import React from "react";
import './App.css';
import SideNav from "./Components/SideNav/SideNav";

function App() {

  const appointments = [
    {  id: 1,patientName: "John Doe", doctorName: "Dr. Emily Clark", appointmentTime: "10:00 AM", status: "Pending" },
    {  id: 2,patientName: "Jane Smith", doctorName: "Dr. Robert Lee", appointmentTime: "11:30 AM", status: "Pending" },
    {  id: 3,patientName: "Michael Johnson", doctorName: "Dr. Sarah Brown", appointmentTime: "1:00 PM", status: "Pending" },
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
          <h1 className="dashboard-title">Welcome to HealthHub Medial Center </h1>
          <p className="dashboard-description">Manage your Departmens, Doctors, and Employees seamlessly</p>

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
