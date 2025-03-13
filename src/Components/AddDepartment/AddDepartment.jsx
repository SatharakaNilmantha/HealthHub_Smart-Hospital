import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddDepartment.css";

const AddDepartment = () => {
  const navigate = useNavigate();
  
  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    labList: ["", "", ""], // 3 initial lab fields
    noOfRooms: "",
    noOfDoctors: "",
  });

  const handleChange = (e, index) => {
    if (index !== undefined) {
      // Updating lab list fields
      const updatedLabList = [...formData.labList];
      updatedLabList[index] = e.target.value;
      setFormData({ ...formData, labList: updatedLabList });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleAddLab = () => {
    // Add a new empty lab field
    setFormData({ ...formData, labList: [...formData.labList, ""] });
  };

  const handleEditSave = () => {
    if (isEditable) {
      // Perform save operation here (e.g., send data to backend)
      console.log("Saved details:", formData);
    }
    setIsEditable(!isEditable);
  };

  const handleBack = () => {
    navigate("/dashboard"); // Navigates to Dashboard
  };

  return (
    <div className="add-department-container">
      <h2>Add Department Details</h2>

      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Audiology"
          disabled={!isEditable}
        />
      </div>

      {/* Lab List Section with Add Button */}
      <div className="form-group lab-group">
        <label>Lab List</label>
        <div className="lab-list">
          {formData.labList.map((lab, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Lab ${index + 1}`}
              value={lab}
              onChange={(e) => handleChange(e, index)}
              disabled={!isEditable}
            />
          ))}
          {isEditable && (
            <button className="add-lab-btn" onClick={handleAddLab}>
              + Add Lab
            </button>
          )}
        </div>
      </div>

      <div className="form-group">
        <label>No of Rooms</label>
        <input
          type="number"
          name="noOfRooms"
          value={formData.noOfRooms}
          onChange={handleChange}
          placeholder="Enter no of rooms"
          disabled={!isEditable}
        />
      </div>

      <div className="form-group">
        <label>No of Doctors</label>
        <input
          type="number"
          name="noOfDoctors"
          value={formData.noOfDoctors}
          onChange={handleChange}
          placeholder="Enter no of doctors"
          disabled={!isEditable}
        />
      </div>

      <div className="button-group">
        <button className="edit-save-btn" onClick={handleEditSave}>
          {isEditable ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default AddDepartment;
