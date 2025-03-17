import React from "react";
import SideNav from "../../Components/SideNav/SideNav"; // Fixed import path
import "./Consultation.css";

const Consultation = () => {
  const appointments = [
    { id: 1, name: "A.B.C. Perera", age: "50 yrs", date: "2025/02/10 - 10:50 am", fees: "1500.00" },
    { id: 2, name: "W. Wimala", age: "84 yrs", date: "2025/02/10 - 11:00 am", fees: "1500.00" },
    { id: 3, name: "S. Nanisaki", age: "73 yrs", date: "2025/02/10 - 11:20 am", fees: "1500.00" },
    { id: 4, name: "E. Evelyn", age: "21 yrs", date: "2025/02/10 - 11:40 am", fees: "1500.00" },
    { id: 5, name: "W.A. Senatilaka", age: "38 yrs", date: "2025/02/13 - 10:50 am", fees: "1500.00" },
    { id: 6, name: "R.A. Preem", age: "23 yrs", date: "2025/02/13 - 11:00 am", fees: "1500.00" },
    { id: 7, name: "C. Welma", age: "23 yrs", date: "2025/02/13 - 11:20 am", fees: "1500.00" },
    { id: 8, name: "H. Harry", age: "56 yrs", date: "2025/02/13 - 11:40 am", fees: "1500.00" },
    { id: 9, name: "Z. Malik", age: "45 yrs", date: "2025/02/13 - 11:20 am", fees: "1500.00" }
  ];

  const handleDone = (id) => {
    confirm(`Appointment for ${id} marked as Done.`);
    // Add logic to update the status in the database
  };

  const handleCancel = (id) => {
    confirm(`Appointment for ${id} canceled.`);
    // Add logic to update the status in the database
  };

  return (
    <div className="consultation-layout">
      {/* Sidebar Navigation */}
      <SideNav />

      {/* Main Content */}
      <div className="content">
        <h1 className="dashboard-title">Consultation Appointments</h1>
        <p className="dashboard-description">Manage your upcoming consultation bookings</p>

        {/* Table Section */}
        <div className="action-table">
          <h3>Latest Consultation Appointments</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Appointment Date & Time</th>
                <th>Fees - Rs.</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.name}</td>
                  <td>{appointment.age}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.fees}</td>
                  <td>
                    <button className="accept-btn" onClick={() => handleDone(appointment.id)}>Done</button>
                    <button className="cancel-btn" onClick={() => handleCancel(appointment.id)}>Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
