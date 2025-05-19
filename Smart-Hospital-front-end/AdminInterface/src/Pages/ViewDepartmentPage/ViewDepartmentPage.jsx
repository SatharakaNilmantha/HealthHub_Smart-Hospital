import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaAnglesLeft } from "react-icons/fa6";
import axios from "axios";
import PopupMessage from "../../Components/PopupMessage/popupMessage.jsx"; // Import PopupMessage
import './ViewDepartmentPage.css';

function ViewDepartmentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Ensure that department is passed correctly from the location state
  const department = location.state?.department || {}; // Default to an empty object if department is not found

  const [formData, setFormData] = useState({
    departmentId: department.departmentId || "", // Ensure that id is initialized from department or fallback to empty string
    name: department.name || "",
    labList: department.labList || [""],
    noOfRooms: department.noOfRooms || "",
    noOfDoctors: department.noOfDoctors || "",
  });

  const [isEditable, setIsEditable] = useState(false);
  const [popupMessage, setPopupMessage] = useState({ type: "", message: "" }); // State for popup messages

  useEffect(() => {
    // Reinitialize form data if department changes
    setFormData({
      departmentId: department.departmentId || "", // Ensure ID is set correctly when department changes
      name: department.name || "",
      labList: department.labList || [""],
      noOfRooms: department.noOfRooms || "",
      noOfDoctors: department.noOfDoctors || "",
    });
  }, [department]);

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

  const handleAddLab = () => {
    setFormData((prevData) => ({
      ...prevData,
      labList: [...prevData.labList, ""],
    }));
  };

  const handleRemoveLab = (index) => {
    setFormData((prevData) => {
      const updatedLabs = prevData.labList.filter((_, i) => i !== index);
      return { ...prevData, labList: updatedLabs };
    });
  };

  const handleEditSave = () => {
    if (isEditable) {
      // Show confirmation dialog before updating
      const isConfirmed = window.confirm("Are you sure you want to update this department?");
      if (isConfirmed) {
        handleUpdate();
      }
    }
    setIsEditable((prev) => !prev);
  };

  const handleUpdate = async () => {
    if (!formData.departmentId) {
      setPopupMessage({ type: "error", message: "Department ID is missing." });
      return;
    }

    // Validate the form data before sending it to the backend
    if (!formData.name || !formData.noOfRooms || !formData.noOfDoctors) {
      setPopupMessage({ type: "error", message: "All fields except Lab List are required." });
      return;
    }

    if (formData.labList.some(lab => lab.trim() === "")) {
      setPopupMessage({ type: "error", message: "Lab List cannot have empty values." });
      return;
    }

    try {
      // Log the form data to verify the content
      console.log("Form Data being sent:", formData);

      const response = await axios.put(
        `http://localhost:8080/api/departments/${formData.departmentId}`,  // Correct API endpoint
        formData,
        {
          headers: {
            'Content-Type': 'application/json', // Ensure the request content type is JSON
          },
        }
      );

      // Show success message using setPopupMessage
      setPopupMessage({ type: "success", message: "Department updated successfully!" });

      // Wait for 2 seconds before navigating
      setTimeout(() => {
        navigate("/DepartmentList"); // Navigate to department list after success
      }, 2000); // Delay in milliseconds (2000ms = 2 seconds)

    } catch (error) {
      console.error("Error response data:", error.response?.data); // Log error response data
      console.error("Error message:", error.message);
      setPopupMessage({
        type: "error",
        message: error.response?.data?.message || "Failed to update department. Please check the input and try again.",
      });
    }
  };

  const handleBackClick = () => {
    // Navigate directly to the department list page
    navigate("/DepartmentList");
  };

  return (
    <div className="add-department-container">
      <h2>Department Details</h2>

      {/* Display error or success message */}
      {popupMessage.message && (
        <PopupMessage type={popupMessage.type} message={popupMessage.message} />
      )}

      <div className="form-group">
        <label>Name</label>
        <input type="text" name="name"  value={formData.name}  onChange={handleChange}  disabled={!isEditable} />
      </div>

      <div className="form-group lab-group">
        <label>Lab List</label>
        <div className="lab-list">
          {formData.labList.map((lab, index) => (
            <div key={index} className="lab-item">
              <input type="text" placeholder={`Lab ${index + 1}`} value={lab} onChange={(e) => handleChange(e, index)} disabled={!isEditable} required />
              <button type="button" className="remove-lab-btn" onClick={() => handleRemoveLab(index)} disabled={!isEditable || formData.labList.length <= 1} > - </button>
            </div>
          ))}
          {isEditable && (
            <button className="add-lab-btn" onClick={handleAddLab}>+ Add Lab </button>
          )}
        </div>
      </div>

      <div className="form-group">
        <label>No of Rooms</label>
        <input type="number"  name="noOfRooms"  value={formData.noOfRooms}  onChange={handleChange}  disabled={!isEditable}/>
      </div>

      <div className="form-group">
        <label>No of Doctors</label>
        <input type="number" name="noOfDoctors" value={formData.noOfDoctors} onChange={handleChange} disabled={!isEditable}/>
      </div>

      <div className="button-group">
        <button className="back-button" onClick={handleBackClick}><FaAnglesLeft /> Back</button>
        <button className={`edit-update-btn ${isEditable ? "update-btn" : "edit-btn"}`} onClick={handleEditSave}>{isEditable ? "Update" : "Edit"}</button>
      </div>
    </div>
  );
}

export default ViewDepartmentPage;
