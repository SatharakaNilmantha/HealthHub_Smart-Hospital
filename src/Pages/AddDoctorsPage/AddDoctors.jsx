import React, { useState } from "react";
import "./AddDoctors.css";
import SideNav from "../../components/SideNav/SideNav";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    department: "",
    title: "",
    degree: "",
    description: "",
    gender: "Male",
    address: "",
    phoneNumber: "",
    fees: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  return (
    <>
      <div className="app-container1">
        <SideNav />
        <div className="content">
        <div className="profile-container">
      <div className="profile-header">
        <div className="profile-placeholder">+Profile Placeholder</div>
        <div className="profile-info">
          <h2>Personalize Your Account</h2>
          <p>Your profile photo will appear on apps and devices that use your account.</p>
          <button className="btn">Add Photo</button>
        </div>
      </div>

      <form className="profile-form" onSubmit={handleSubmit}>
        <h2>Profile Information</h2>
        <label>Full Name</label>
        <input type="text" name="fullName" placeholder="Enter the Full Name" onChange={handleChange} />

        <label>Department</label>
        <input type="text" name="department" placeholder="Enter the Department" onChange={handleChange} />

        <label>Title</label>
        <input type="text" name="title" placeholder="Enter the Title" onChange={handleChange} />

        <label>Degree</label>
        <input type="text" name="degree" placeholder="Enter the Degree" onChange={handleChange} />

        <label>Description</label>
        <textarea name="description" placeholder="Enter the Description" onChange={handleChange}></textarea>

        <label>Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label>Address</label>
        <textarea name="address" placeholder="Enter the Address" onChange={handleChange}></textarea>

        <label>Phone Number</label>
        <input type="text" name="phoneNumber" placeholder="Enter the Mobile Number" onChange={handleChange} />

        <label>Fees</label>
        <input type="text" name="fees" placeholder="Enter the Fees" onChange={handleChange} />

        <button type="submit" className="save-btn">Save</button>
      </form>
      </div>
        </div>
      </div>
    </>
  
  );
};

export default ProfileForm;
