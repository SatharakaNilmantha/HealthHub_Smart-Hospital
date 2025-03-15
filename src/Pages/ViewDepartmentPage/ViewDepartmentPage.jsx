import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaAnglesLeft } from "react-icons/fa6";
import './ViewDepartmentPage.css';

function ViewDepartmentPage() {

  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate hook
  const department = location.state?.department || {}; // Retrieve department data

  const [formData, setFormData] = useState({
    name: "",
    labList: [""],
    noOfRooms: "",
    noOfDoctors: "",
  });

  const [isEditable, setIsEditable] = useState(false);

  // Set department data when component mounts
  useEffect(() => {
    setFormData({
      name: department.name || "",
      labList: department.labList || [""],
      noOfRooms: department.rooms || "",
      noOfDoctors: department.doctors || "",
    });
  }, [department]);

  // Handle input changes
  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      if (index !== null) {
        const updatedLabs = [...prevData.labList];
        updatedLabs[index] = value;
        return { ...prevData, labList: updatedLabs };
      }
      return { ...prevData, [name]: value };
    });
  };

  // Add new lab
  const handleAddLab = () => {
    setFormData((prevData) => ({
      ...prevData,
      labList: [...prevData.labList, ""],
    }));
  };

  // Remove lab
  const handleRemoveLab = (index) => {
    setFormData((prevData) => {
      const updatedLabs = prevData.labList.filter((_, i) => i !== index);
      return { ...prevData, labList: updatedLabs };
    });
  };

  // Toggle edit mode
  const handleEditSave = () => {
    setIsEditable((prev) => !prev);
  };

  // Handle back button click
  const handleBackClick = () => {
    navigate(-1); // This will navigate to the previous page
  };

  return (
    <>
      <div className="add-department-container">
        <h2>Department Details</h2>

        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} disabled={!isEditable} />
        </div>

        <div className="form-group lab-group">
          <label>Lab List</label>
          <div className="lab-list">
            {formData.labList.map((lab, index) => (
              <div key={index} className="lab-item">
                <input type="text" placeholder={`Lab ${index + 1}`} value={lab} onChange={(e) => handleChange(e, index)} required />
                <button type="button" className="remove-lab-btn" onClick={() => handleRemoveLab(index)} disabled={formData.labList.length <= 1}>-</button>
              </div>
            ))}
            {isEditable && (
              <button className="add-lab-btn" onClick={handleAddLab}>+ Add Lab</button>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>No of Rooms</label>
          <input type="number" name="noOfRooms" value={formData.noOfRooms} onChange={handleChange} disabled={!isEditable} />
        </div>

        <div className="form-group">
          <label>No of Doctors</label>
          <input type="number" name="noOfDoctors" value={formData.noOfDoctors} onChange={handleChange} disabled={!isEditable} />
        </div>

        <div className="button-group">
          <button className="back-button" onClick={handleBackClick}><FaAnglesLeft />Back</button>
          
          {/* Conditional button styling */}
          <button 
            className={`edit-update-btn ${isEditable ? "update-btn" : "edit-btn"}`} 
            onClick={handleEditSave}
          >
            {isEditable ? "Update" : "Edit"}
          </button>
        </div>
      </div>
    </>
  );
}

export default ViewDepartmentPage;

