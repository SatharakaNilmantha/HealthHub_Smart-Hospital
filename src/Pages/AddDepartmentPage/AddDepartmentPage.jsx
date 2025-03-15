import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddDepartmentPage.css";
import SideNav from "../../components/SideNav/SideNav";

function AddDepartmentPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    labList: ["", "", ""], // 3 initial lab fields
    noOfRooms: "",
    noOfDoctors: "",
  });

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

  const handleSave = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Saved details:", formData);
    // Here, you can send formData to the backend
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
              <input  type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Audiology" required/>
            </div>

            {/* Lab List Section with Add and Remove Buttons */}
            <div className="form-group lab-group">
              <label>Lab List</label>
              <div className="lab-list">
                {formData.labList.map((lab, index) => (
                  <div key={index} className="lab-item">
                    <input type="text" placeholder={`Lab ${index + 1}`}value={lab} onChange={(e) => handleChange(e, index)} required/>
                    <button type="button"className="remove-lab-btn" onClick={() => handleRemoveLab(index)}disabled={formData.labList.length <= 1}> -</button>
                  </div>
                ))}
                <button type="button" className="add-lab-btn" onClick={handleAddLab}> + Add Lab</button>
              </div>
            </div>

            <div className="form-group">
              <label>No of Rooms</label>
              <input type="number" name="noOfRooms" value={formData.noOfRooms} onChange={handleChange} placeholder="Enter no of rooms"  required/>
            </div>

            <div className="form-group">
              <label>No of Doctors</label>
              <input type="number" name="noOfDoctors"  value={formData.noOfDoctors}  onChange={handleChange} placeholder="Enter no of doctors" required/>
            </div>

            <div className="button-group1">
              <button type="submit" className="save-btn">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddDepartmentPage;
