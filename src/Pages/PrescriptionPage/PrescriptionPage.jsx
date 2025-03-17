import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Default CSS for the date picker
import './PrescriptionPage.css'; // Your CSS file

const PrescriptionPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Format the date as dd/mm/yyyy
  const formatDate = (date) => {
    if (!date) return 'dd/mm/yyyy';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form Submitted!');
  };

  return (
    <div className="prescription-page">
      {/* Header */}
      <div className="header">
        <h1>HealthHub</h1>
        <p>MEDICAL CENTER</p>
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
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select a date"
          className="date-picker-input"
        />
      </div>

      {/* Prescription Form */}
      <form className="prescription-form" onSubmit={handleSubmit}>
        {/* Patient's Name */}
        <div className="form-group">
          <label htmlFor="patientName">Patient's Name</label>
          <input type="text" id="patientName" name="patientName" placeholder="Enter patient's name" required />
        </div>

        {/* Contact Number */}
        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            placeholder="Enter contact number"
            pattern="[0-9]{10}"
            required
          />
        </div>

        {/* Select Gender */}
        <div className="form-group">
          <label>Select Gender</label>
          <div className="gender-options">
            <label><input type="radio" name="gender" value="male" required /> Male</label>
            <label><input type="radio" name="gender" value="female" required /> Female</label>
            <label><input type="radio" name="gender" value="other" required /> Other</label>
          </div>
        </div>

        {/* Patient's Age */}
        <div className="form-group">
          <label htmlFor="patientAge">Patient's Age</label>
          <input type="number" id="patientAge" name="patientAge" placeholder="Enter patient's age" required />
        </div>

        {/* Reason for Consultation */}
        <div className="form-group">
          <label htmlFor="reason">Reason for Consultation</label>
          <textarea id="reason" name="reason" placeholder="Enter reason for consultation" required></textarea>
        </div>

        {/* Medicine / Strength / Frequency */}
        <div className="form-group">
          <label htmlFor="medicine">Medicine / Strength / Frequency</label>
          <input type="text" id="medicine" name="medicine" placeholder="Enter medicine details" required />
        </div>

        {/* Required Tests */}
        <div className="form-group">
          <label htmlFor="tests">Required Tests</label>
          <input type="text" id="tests" name="tests" placeholder="Enter required tests" required />
        </div>

        {/* Treatment & Fee Details */}
        <div className="form-group">
          <label htmlFor="treatment">Treatment & Fee Details</label>
          <textarea id="treatment" name="treatment" placeholder="Enter treatment and fee details" required></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default PrescriptionPage;