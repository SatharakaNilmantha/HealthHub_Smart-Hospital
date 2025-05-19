import React, { useState, useEffect } from "react";
import './App.css';
import { Link } from "react-router-dom";
import SideNav from "./Components/SideNav/SideNav";
import { FaCalendarCheck, FaUserMd, FaStethoscope } from "react-icons/fa";
import axios from "axios";
import PopupMessage from "./Components/PopupMessage/popupMessage";

function App() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  const [error, setError] = useState(null);
  const [popup, setPopup] = useState({ type: "hidden", message: "" });
  const [searchQuery, setSearchQuery] = useState(""); // Search input state

  useEffect(() => {
    axios.get("http://localhost:8080/api/Prescriptions/getPrescription")
      .then(response => {
        setPrescriptions(response.data);
        const pending = response.data.filter(p => p.status.toLowerCase() === "pending").length;
        const accepted = response.data.filter(p => p.status.toLowerCase() === "accepted").length;
        setPendingCount(pending);
        setAcceptedCount(accepted);
      })
      .catch(error => setError(error.message));

    axios.get("http://localhost:8080/api/doctors/getAllDoctors")
      .then(response => setDoctorCount(response.data.length))
      .catch(error => console.error("Error fetching doctors:", error));

    axios.get("http://localhost:8080/api/departments/getDepartments")
      .then(response => setDepartmentCount(response.data.length))
      .catch(error => console.error("Error fetching departments:", error));
  }, []);

  const handleAccept = async (prescriptionId) => {
    setPopup({ type: "hidden", message: "" });
    if (window.confirm("Are you sure you want to accept this prescription?")) {
      try {
        await axios.put(`http://localhost:8080/api/Prescriptions/${prescriptionId}`, { status: "accepted" });

        setPrescriptions(prevPrescriptions =>
          prevPrescriptions.map(p =>
            p.prescriptionId === prescriptionId ? { ...p, status: "accepted" } : p
          )
        );
        setAcceptedCount(prev => prev + 1);
        setPendingCount(prev => prev - 1);
        setPopup({ type: "success", message: "Prescription accepted successfully!" });
      } catch (error) {
        setPopup({ type: "error", message: "Failed to accept prescription." });
      }
    }
  };

  const handleCancel = async (prescriptionId) => {
    setPopup({ type: "hidden", message: "" });
    if (window.confirm("Are you sure you want to cancel this prescription?")) {
      try {
        await axios.delete(`http://localhost:8080/api/Prescriptions/${prescriptionId}`);

        setPrescriptions(prevPrescriptions =>
          prevPrescriptions.filter(p => p.prescriptionId !== prescriptionId)
        );
        setPendingCount(prev => prev - 1);
        setPopup({ type: "success", message: "Prescription canceled successfully!" });
      } catch (error) {
        setPopup({ type: "error", message: "Failed to cancel prescription." });
      }
    }
  };

  // Filter prescriptions based on search query
  const filteredPrescriptions = prescriptions.filter((prescription) =>
    prescription.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prescription.contactNumber.includes(searchQuery)
  );

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
              <div className="card">
                <div className="card-icon">
                  <FaCalendarCheck size={40} color="#007bff" />
                </div>
                <div className="card-content">
                  <h3>Active Appointments</h3>
                  <p>{pendingCount}</p>
                  <span>Awaiting Approval</span>
                </div>
              </div>

              <div className="card">
                <div className="card-icon">
                  <FaCalendarCheck size={40} color="#2ecc71" />
                </div>
                <div className="card-content">
                  <h3>Accepted Prescriptions</h3>
                  <p>{acceptedCount}</p>
                  <span>Successfully Processed</span>
                </div>
              </div>

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

            {/* Search Bar */}
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search by Patient Name or Contact Number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Table Section */}
            <div className="action-table">
              <h3>Latest Available Prescription</h3>
              <table>
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Contact Number</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPrescriptions
                    .filter(prescription => prescription.status.toLowerCase() !== "accepted")
                    .map(prescription => (
                      <tr key={prescription.prescriptionId}>
                        <td>{prescription.patientName}</td>
                        <td>{prescription.contactNumber}</td>
                        <td>{prescription.status}</td>
                        <td>
                          <Link to={`/prescription/${prescription.prescriptionId}`}><button className="view-btn">View</button></Link>
                          <button className="accept-btn" onClick={() => handleAccept(prescription.prescriptionId)}>Accept</button>
                          <button className="cancel-btn" onClick={() => handleCancel(prescription.prescriptionId)}>Cancel</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <PopupMessage type={popup.type} message={popup.message} />
    </>
  );
}

export default App;
