import React from "react";
import SideNav from "../../Components/SideNav/SideNav"; // Fixed import path
import "./Treatment.css";

const Treatment = () => {
  const treatments = [
    { id: 1, name: "A.B.C. Perera", age: "50 yrs", date: "2025/02/10 - 10:50 am", fees: "2000.00" },
    { id: 2, name: "W. Wimala", age: "84 yrs", date: "2025/02/10 - 11:00 am", fees: "2000.00" },
    { id: 3, name: "S. Nanisaki", age: "73 yrs", date: "2025/02/10 - 11:20 am", fees: "2000.00" },
    { id: 4, name: "E. Evelyn", age: "21 yrs", date: "2025/02/10 - 11:40 am", fees: "2000.00" },
    { id: 5, name: "W.A. Senatilaka", age: "38 yrs", date: "2025/02/13 - 10:50 am", fees: "2000.00" },
    { id: 6, name: "R.A. Preem", age: "23 yrs", date: "2025/02/13 - 11:00 am", fees: "2000.00" },
    { id: 7, name: "C. Welma", age: "23 yrs", date: "2025/02/13 - 11:20 am", fees: "2000.00" },
    { id: 8, name: "H. Harry", age: "56 yrs", date: "2025/02/13 - 11:40 am", fees: "2000.00" },
    { id: 9, name: "Z. Malik", age: "45 yrs", date: "2025/02/13 - 11:20 am", fees: "2000.00" }
  ];

  const handleCompleted = (id) => {
    confirm(`Treatment for ${id} marked as Completed.`);
    // Add logic to update the status in the database
  };

  const handleCancel = (id) => {
    confirm(`Treatment for ${id} canceled.`);
    // Add logic to update the status in the database
  };

  return (
    <div className="treatment-layout">
      {/* Sidebar Navigation */}
      <SideNav />

      {/* Main Content */}
      <div className="content">
        <h1 className="dashboard-title">Treatment Sessions</h1>
        <p className="dashboard-description">Manage your ongoing treatment sessions</p>

        {/* Table Section */}
        <div className="action-table">
          <h3>Latest Treatment Sessions</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Treatment Date & Time</th>
                <th>Fees - Rs.</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {treatments.map((treatment) => (
                <tr key={treatment.id}>
                  <td>{treatment.name}</td>
                  <td>{treatment.age}</td>
                  <td>{treatment.date}</td>
                  <td>{treatment.fees}</td>
                  <td>
                    <button className="done-btn" onClick={() => handleCompleted(treatment.id)}>Completed</button>
                    <button className="cancel-btn" onClick={() => handleCancel(treatment.id)}>Cancel</button>
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

export default Treatment;
