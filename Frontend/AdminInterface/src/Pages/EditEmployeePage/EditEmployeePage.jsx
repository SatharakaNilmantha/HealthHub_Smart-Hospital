import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './EditEmployeePage.css';
import { FaAnglesLeft } from "react-icons/fa6";
import PopupMessage from "../../Components/PopupMessage/popupMessage.jsx";  // Import the PopupMessage component

import memployee from '../../Images/doctor/memployee.jpg';
import lemployee from '../../Images/doctor/lemployee.jpg';

function EditEmployeePage() {
    const { state: employee } = useLocation();

    // Set default profile image based on gender
    const getDefaultProfilePhoto = (gender) => {
        if (gender === "Male") return memployee;
        if (gender === "Female") return lemployee;
        return "default-profile-photo.jpg";
    };

    const [userData, setUserData] = useState(employee || {});
    const [profilePhoto, setProfilePhoto] = useState(getDefaultProfilePhoto(employee?.gender)); // Initial photo based on gender
    const [isEditing, setIsEditing] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [popupMessage, setPopupMessage] = useState({ type: "", message: "" });
    const navigate = useNavigate();

    // Fetch departments when the component mounts
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/departments/getDepartments");
                if (response.ok) {
                    const departmentList = await response.json();
                    setDepartments(departmentList);
                } else {
                    console.error("Failed to fetch departments");
                }
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };

        fetchDepartments();
    }, []);

    // Update profile photo when gender or employee data changes
    useEffect(() => {
        if (!isEditing) {
            setProfilePhoto(userData.profilePhoto || getDefaultProfilePhoto(userData.gender));
        }
    }, [userData.gender, userData.profilePhoto, isEditing]);

    // Handles the changes in form fields
    const handleFieldChange = (field, value) => {
        setUserData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    // Handles photo upload and sets the preview image
    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfilePhoto(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handles saving or toggling edit mode
    const handleEditSave = async () => {
        setPopupMessage({ type: "hidden", message: "" });

        if (isEditing) {
            const confirmed = window.confirm("Do you want to save the changes?");
            if (confirmed) {
                try {
                    // Create FormData object
                    const formData = new FormData();
                    
                    // Append employee data as JSON string
                    formData.append("employee", JSON.stringify(userData));

                    // Append image if available
                    if (profilePhoto !== "default-profile-photo.jpg") {
                        const fileInput = document.querySelector('input[type="file"]');
                        if (fileInput && fileInput.files[0]) {
                            formData.append("image", fileInput.files[0]);
                        }
                    }

                    // Send the PUT request with FormData
                    const response = await fetch(
                        `http://localhost:8080/api/employees/${userData.employeeId}`,
                        {
                            method: "PUT",
                            body: formData,
                        }
                    );

                    if (response.ok) {
                        setIsEditing(false);
                        setPopupMessage({ type: "success", message: "Employee details updated successfully!" });
                    } else {
                        setPopupMessage({ type: "error", message: "Failed to update employee details." });
                    }
                } catch (error) {
                    console.error("Error updating employee:", error);
                    setPopupMessage({ type: "warning", message: "Check the connection." });
                }
            }
        } else {
            setIsEditing(true);
        }
    };


    const handleBackClick = () => {
        // Navigate directly to the  list page
        navigate("/employees");
      };

    return (
        <div className="profile-details-card">
            <div className="profile-page">
                {/* Profile Header */}
                <div className="profile-header-card">
                    <div className="profile-header">
                        <img  className="profile-photo1"  src={profilePhoto}  alt="Profile"  style={{ width: "150px", height: "150px", borderRadius: "50%" }}/>
                        <div className="profile-info">
                            <h2>Personalize Your Account</h2>
                            <p>Your profile photo will appear on apps and devices that use your account.</p>
                            <label className="upload-btn">
                                Change Photo
                                <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: "none" }} />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Profile Information */}
                <h3>Profile Information</h3>
                <div className="profile-info-container">
                    {[ 
                        { label: "Full Name", field: "fullName" },
                        { label: "Address", field: "address" },
                        { label: "Department", field: "department", type: "select", options: departments },
                        { label: "Salary", field: "salary" },
                        { label: "Gender", field: "gender", type: "select", options: ["Male", "Female", "Other"] },
                        { label: "Phone Number", field: "phoneNumber" },
                        { label: "Role", field: "role" },
                        { label: "Shift Start Time", field: "shiftStartTime", type: "time" },
                        { label: "Shift End Time", field: "shiftEndTime", type: "time" }
                    ].map(({ label, field, type = "text", options }) => (
                        <div className="profile-row" key={field}>
                            <label className="field-label">{label}</label>
                            {isEditing ? (
                                type === "select" ? (
                                    <select
                                        className="editable-input"
                                        value={userData[field] || ""}
                                        onChange={(e) => handleFieldChange(field, e.target.value)}
                                        required
                                    >
                                        <option value="">Select {label}</option>
                                        {options && options.map((option, index) => (
                                            <option key={index} value={option.name || option}>{option.name || option}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type={type}
                                        className="editable-input"
                                        value={userData[field] || ""}
                                        onChange={(e) => handleFieldChange(field, e.target.value)}
                                        required
                                    />
                                )
                            ) : (
                                <span className="field-value">{userData[field]}</span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Button Group */}
                <div className="button-group">
                    <button className="back-button" onClick={handleBackClick}>
                        <FaAnglesLeft /> Back
                    </button>

                    <button
                        className={`edit-update-btn ${isEditing ? "update-btn" : "edit-btn"}`}
                        onClick={handleEditSave}
                    >
                        {isEditing ? "Update" : "Edit"}
                    </button>
                </div>
            </div>

            {/* Popup Message */}
            <PopupMessage type={popupMessage?.type} message={popupMessage?.message} />
        </div>
    );
}

export default EditEmployeePage;
