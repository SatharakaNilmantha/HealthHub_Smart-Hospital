import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddDepartmentPage.css";
import SideNav from "../../components/SideNav/SideNav";
import PopupMessage from "../../Components/PopupMessage/popupMessage.jsx"; // Import PopupMessage

function AddDepartmentPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    labList: ["", "", ""], // 3 initial lab fields
    noOfRooms: "",
    noOfDoctors: "",
  });

  const [popupMessage, setPopupMessage] = useState({ type: "", message: "" }); // State for popup message

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (index !== undefined) {
      // Updating lab list fields
      const updatedLabList = [...formData.labList];
      updatedLabList[index] = value;
      setFormData({ ...formData, labList: updatedLabList });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddLab = () => {
    setFormData({ ...formData, labList: [...formData.labList, ""] });
  };

  const handleRemoveLab = (index) => {
    if (formData.labList.length > 1) {
      const updatedLabList = formData.labList.filter((_, i) => i !== index);
      setFormData({ ...formData, labList: updatedLabList });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setPopupMessage({ type: "hiddne", message: "Saving department..." }); // Info message before request

    try {
      const response = await fetch("http://localhost:8080/api/departments/saveDepartment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setPopupMessage({ type: "success", message: "Department added successfully!" });
        navigate("/addDepartment"); // Redirect to departments list page
      } else {
        const errorMessage = await response.text();
        setPopupMessage({ type: "error", message: errorMessage });
      }
    } catch (error) {
      console.error("Error saving department:", error);
      setPopupMessage({ type: "error", message: "An error occurred while saving the department." });
    }
  };

  return (
    <div className="app-container1">
      <SideNav />
      <div className="content">
        <div className="add-department-container1">
          <h2>Add Department Details</h2>

          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name"  value={formData.name}  onChange={handleChange}  placeholder="Enter the Department Name"  required />
            </div>

            {/* Lab List Section with Add and Remove Buttons */}
            <div className="form-group lab-group">
              <label>Lab List</label>
              <div className="lab-list">
                {formData.labList.map((lab, index) => (
                  <div key={index} className="lab-item">
                    <input type="text" placeholder={`Lab ${index + 1}`} value={lab} onChange={(e) => handleChange(e, index)} required/>
                    <button type="button" className="remove-lab-btn"  onClick={() => handleRemoveLab(index)}  disabled={formData.labList.length <= 1}> - </button>
                  </div>
                ))}
                <button type="button" className="add-lab-btn" onClick={handleAddLab}> + Add Lab </button>
              </div>
            </div>

            <div className="form-group">
              <label>No of Rooms</label>
              <input type="number" name="noOfRooms" value={formData.noOfRooms} onChange={handleChange} placeholder="Enter no of rooms" required/>
            </div>

            <div className="form-group">
              <label>No of Doctors</label>
              <input type="number" name="noOfDoctors" value={formData.noOfDoctors} onChange={handleChange} placeholder="Enter no of doctors" required/>
            </div>

            <div className="button-group1">
              <button type="submit" className="save-btn">Save</button>
            </div>
          </form>
        </div>
      </div>

      {/* Show popup message dynamically */}
      {popupMessage.message && <PopupMessage type={popupMessage.type} message={popupMessage.message} />}
    </div>
  );
}

export default AddDepartmentPage;
