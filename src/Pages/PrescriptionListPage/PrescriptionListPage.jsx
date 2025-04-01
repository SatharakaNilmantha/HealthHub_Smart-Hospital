import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SideNav from '../../Components/SideNav/SideNav.jsx';

function PrescriptionListPage() {
    const [prescriptions, setPrescriptions] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8080/api/Prescriptions/getPrescription")
            .then(response => {
                setPrescriptions(response.data);
            })
            .catch(error => setError(error.message));
    }, []);

    // Filter accepted prescriptions
    const acceptedPrescriptions = prescriptions.filter(
        (prescription) => prescription.status.toLowerCase() === "accepted"
    );

    // Apply search filtering on accepted prescriptions
    const filteredPrescriptions = acceptedPrescriptions.filter(
        (prescription) =>
            prescription.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            prescription.contactNumber.includes(searchQuery)
    );

    return (
        <div className="app-container">
            <SideNav />
            <div className="content">
                <h1 className="dashboard-title">Welcome to HealthHub Medical Center</h1>
                <p className="dashboard-description">View and manage patient prescriptions with ease.</p>

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
                    <h3>Accepted Prescriptions</h3>
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
                            {filteredPrescriptions.map(prescription => (
                                <tr key={prescription.prescriptionId}>
                                    <td>{prescription.patientName}</td>
                                    <td>{prescription.contactNumber}</td>
                                    <td>{prescription.status}</td>
                                    <td>
                                        <Link to={`/prescription/${prescription.prescriptionId}`}>
                                            <button className="view-btn">View</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {filteredPrescriptions.length === 0 && (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: "center" }}>No accepted prescriptions found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default PrescriptionListPage;
