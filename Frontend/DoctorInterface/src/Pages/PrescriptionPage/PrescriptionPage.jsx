import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import default datepicker styles
import './PrescriptionPage.css'; // Import custom CSS
import SideNav from '../../Components/SideNav/SideNav';
import logo from "../../Images/logo/logo-removebg.png";
import PopupMessage from '../../Components/PopupMessage/popupMessage.jsx'; // Import PopupMessage component

function PrescriptionPage() {
    const initialFormState = {
        patientName: '',
        contactNumber: '',
        gender: '',
        age: '',
        reasonForConsultation: '',
        medicineDetails: '',
        requiredTests: '',
        treatmentDetails: '',
    };

    const [selectedDate, setSelectedDate] = useState(new Date()); // Set initial date to today's date
    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [popupMessage, setPopupMessage] = useState({ type: "", message: "" }); // State to control the popup message

    // Function to format date to dd/MM/yyyy
    const formatDate = (date) => {
      if (!date) return "";
      return date.toISOString().split("T")[0]; // Format as yyyy-MM-dd
    };
  
    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // Clear errors when user types
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    // Validate form before submission
    const validateForm = () => {
        let newErrors = {};

        if (!formData.patientName.trim()) newErrors.patientName = "Patient's name is required.";
        if (!formData.contactNumber.match(/^\d{10}$/)) newErrors.contactNumber = "Contact number must be exactly 10 digits.";
        if (!formData.gender) newErrors.gender = "Please select a gender.";
        if (!formData.age || formData.age < 0) newErrors.age = "Please enter a valid age.";
        if (!formData.reasonForConsultation.trim()) newErrors.reasonForConsultation = "Reason for consultation is required.";
        if (!formData.medicineDetails.trim()) newErrors.medicineDetails = "Medicine details are required.";
        if (!formData.requiredTests.trim()) newErrors.requiredTests = "Required tests must be specified.";
        if (!formData.treatmentDetails.trim()) newErrors.treatmentDetails = "Treatment details are required.";
        if (!selectedDate) newErrors.prescriptionDate = "Please select a prescription date.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        setPopupMessage({ type: "hiddne", message: " " });

        if (!validateForm()) {
            alert("Please fix the errors before submitting.");
            return;
        }

        // Show a confirmation alert before submitting
        const confirmed = window.confirm("Are you sure you want to submit this prescription?");
        if (!confirmed) return;

        const prescriptionData = {
            ...formData,
            age: parseInt(formData.age, 10),
            prescriptionDate: formatDate(selectedDate),
            status: "pending",
        };

        try {
            const response = await fetch("http://localhost:8080/api/Prescriptions/savePrescription", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(prescriptionData),
            });

            if (response.ok) {
                setPopupMessage({ type: "success", message: "Prescription saved successfully!" });
                setFormData(initialFormState);
                setSelectedDate(new Date()); // Reset date to today's date
                setErrors({});
            } else {
                const errorMessage = await response.text();
                setPopupMessage({ type: "error", message: `Error: ${errorMessage}` })
            }
        } catch (error) {
            console.error("Error saving prescription:", error);
            setPopupMessage({ type: "warning", message: "Please Check the Network connection!" });
        }
    };

    return (
        <div className="app-container">
            <SideNav />
            <div className="content">
                <div className="prescription-page">
                    {/* Header */}
                    <div className="header">
                        <img className="logoimg" src={logo} alt="Logo" />
                    </div>
                    {/* Page Title */}
                    <div className="page-title">
                      <h2>Medical Prescription Form</h2>
                      <div className="form-date">
                        {/* Display the selected date in dd/mm/yyyy format */}
                        {formatDate(selectedDate)}
                      </div>
                    </div>

                    {/* Date Picker */}
                    <div className="date-picker-container">
                        <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)}  dateFormat="dd/MM/yyyy" placeholderText="Select a date" className="date-picker-input"/>
                        {errors.prescriptionDate && <p className="error-text">{errors.prescriptionDate}</p>}
                    </div>

                    {/* Prescription Form */}
                    <form className="prescription-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Patient's Name</label>
                            <input type="text" name="patientName" required value={formData.patientName} onChange={handleInputChange} />
                            {errors.patientName && <p className="error-text">{errors.patientName}</p>}
                        </div>

                        <div className="form-group">
                            <label>Contact Number</label>
                            <input type="tel" name="contactNumber" required pattern="[0-9]{10}" value={formData.contactNumber} onChange={handleInputChange} />
                            {errors.contactNumber && <p className="error-text">{errors.contactNumber}</p>}
                        </div>

                        <div className="form-group">
                            <label>Select Gender</label>
                            <div className="gender-options">
                                <label><input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleInputChange} /> Male</label>
                                <label><input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleInputChange} /> Female</label>
                                <label><input type="radio" name="gender" value="Other" checked={formData.gender === "Other"} onChange={handleInputChange} /> Other</label>
                            </div>
                            {errors.gender && <p className="error-text">{errors.gender}</p>}
                        </div>

                        <div className="form-group">
                            <label>Patient's Age</label>
                            <input type="number" name="age" required value={formData.age} onChange={handleInputChange} />
                            {errors.age && <p className="error-text">{errors.age}</p>}
                        </div>

                        <div className="form-group">
                            <label>Reason for Consultation</label>
                            <textarea name="reasonForConsultation" required value={formData.reasonForConsultation} onChange={handleInputChange}></textarea>
                        </div>

                        <div className="form-group">
                            <label>Medicine / Strength / Frequency</label>
                            <input type="text" name="medicineDetails" required value={formData.medicineDetails} onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <label>Required Tests</label>
                            <input type="text" name="requiredTests" required value={formData.requiredTests} onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <label>Treatment & Fee Details</label>
                            <textarea name="treatmentDetails" required value={formData.treatmentDetails} onChange={handleInputChange}></textarea>
                        </div>

                        <button type="submit" className="submit-button">Submit</button>
                    </form>

                    {/* Display the PopupMessage component */}
                    <PopupMessage type={popupMessage.type} message={popupMessage.message} />

                </div>
            </div>
        </div>
    );
}

export default PrescriptionPage;
