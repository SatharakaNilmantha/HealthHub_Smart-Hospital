import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import "./PrescriptionPage.css";
import logo from "../../Images/logo/logo-removebg.png";
import { FaAnglesLeft } from "react-icons/fa6";

function PrescriptionPage() {
    const { prescriptionId } = useParams();
    const [prescription, setPrescription] = useState(null);
    
    const navigate = useNavigate(); // useNavigate hook

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/Prescriptions/${prescriptionId}`)
            .then((response) => {
                setPrescription(response.data);
            })
            .catch((error) =>
                console.error("Error fetching prescription details:", error)
            );
    }, [prescriptionId]);

    // Navigate back
    const handleBackClick = () => {
        navigate(-1); // This will go back to the previous page
    };

    return (
        <>
            <div className="prescription-page">
                <div className="prescription-content">
                    {/* Header */}
                    <div className="header">
                        <img className="logoimg" src={logo} alt="Logo" />
                    </div>

                    {/* Page Title & Date Picker */}
                    <div className="page-title">
                        <h2>Medical Prescription Details</h2>
                        <div className="form-date">{new Date(prescription?.prescriptionDate).toLocaleDateString()}</div>
                    </div>

                    {/* Prescription Form */}
                    {prescription && (
                        <div className="prescription-details">
                            <div className="form-group">
                                <label>Patient's Name</label>
                                <p>{prescription.patientName}</p>
                            </div>

                            <div className="form-group">
                                <label>Contact Number</label>
                                <p>{prescription.contactNumber}</p>
                            </div>

                            <div className="form-group">
                                <label>Gender</label>
                                <p>{prescription.gender}</p>
                            </div>

                            <div className="form-group">
                                <label>Patient's Age</label>
                                <p>{prescription.age}</p>
                            </div>

                            <div className="form-group">
                                <label>Reason for Consultation</label>
                                <p>{prescription.reasonForConsultation}</p>
                            </div>

                            <div className="form-group">
                                <label>Medicine / Strength / Frequency</label>
                                <p>{prescription.medicineDetails}</p>
                            </div>

                            <div className="form-group">
                                <label>Required Tests</label>
                                <p>{prescription.requiredTests}</p>
                            </div>

                            <div className="form-group">
                                <label>Treatment & Fee Details</label>
                                <p>{prescription.treatmentDetails}</p>
                            </div>
                        </div>
                    )}

                    <div className="button-group">
                        <button className="back-button" onClick={handleBackClick}><FaAnglesLeft /> Back</button>
                        <button className="print-button">Print Prescription </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PrescriptionPage;

