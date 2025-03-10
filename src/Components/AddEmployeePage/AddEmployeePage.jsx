import React from 'react';
import './AddEmployeePage.css';

function AddEmployeePage() {
  return (
    <div className="add-employee-container">
      <div className="add-employee-header">
        <h2>Add Employee</h2>
        <p>Fill in the details below to add a new employee.</p>
      </div>

      <form className="add-employee-form">
        {/* Full Name */}
        <div className="form-row">
          <label className="field-label">Full Name</label>
          <input type="text" className="editable-input" placeholder="Enter full name" required />
        </div>

        {/* Department */}
        <div className="form-row">
          <label className="field-label">Department</label>
          <input type="text" className="editable-input" placeholder="Enter department" required />
        </div>

        {/* Role */}
        <div className="form-row">
          <label className="field-label">Role</label>
          <input type="text" className="editable-input" placeholder="Enter role" required />
        </div>

        {/* Gender */}
        <div className="form-row">
          <label className="field-label">Gender</label>
          <select className="editable-input">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Address */}
        <div className="form-row">
          <label className="field-label">Address</label>
          <textarea className="editable-input" placeholder="Enter address" required />
        </div>

        {/* Salary */}
        <div className="form-row">
          <label className="field-label">Salary</label>
          <input type="text" className="editable-input" placeholder="Enter salary" required />
        </div>

        {/* Shift */}
        <div className="form-row">
          <label className="field-label">Shift</label>
          <input type="text" className="editable-input" placeholder="Enter shift" required />
        </div>

        {/* Buttons */}
        <div className="form-buttons">
          <button type="button" className="back-button">Back</button>
          <button type="submit" className="save-button">Save</button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployeePage;