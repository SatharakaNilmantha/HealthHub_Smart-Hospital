import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './ViewDoctorsPage.css';
import { FaAnglesLeft } from "react-icons/fa6";
import PopupMessage from "../../Components/PopupMessage/popupMessage.jsx"; 

import mdoctor from '../../Images/doctor/mdoctor.jpg';
import ldoctor from '../../Images/doctor/ldoctor.jpg';

function ViewDoctorsPage() {
    const { state: doctor } = useLocation();
    const [userData, setUserData] = useState(doctor || {});

    // Set default profile image based on gender
    const getDefaultProfilePhoto = (gender) => {
        if (gender === "Male") return mdoctor;
        if (gender === "Female") return ldoctor;
        return "default-profile-photo.jpg";
    };

    const [profilePhoto, setProfilePhoto] = useState(doctor?.profilePhoto || getDefaultProfilePhoto(doctor?.gender));
    const [isEditing, setIsEditing] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [popupMessage, setPopupMessage] = useState({ type: "", message: "" });
    const navigate = useNavigate();

    // Fetch departments
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

    // Update profile photo when gender changes
    useEffect(() => {
        if (!isEditing) {
            setProfilePhoto(userData.profilePhoto || getDefaultProfilePhoto(userData.gender));
        }
    }, [userData.gender, isEditing]);

    // Handle input changes
    const handleFieldChange = (field, value) => {
        setUserData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    // Handle photo upload
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

    // Handle saving or toggling edit mode
    const handleEditSave = async () => {
        setPopupMessage({ type: "hidden", message: "" });

        if (isEditing) {
            const confirmed = window.confirm("Do you want to save the changes?");
            if (confirmed) {
                try {
                    const formData = new FormData();
                    formData.append("doctor", JSON.stringify(userData));

                    // Append image if changed
                    const fileInput = document.querySelector('input[type="file"]');
                    if (fileInput && fileInput.files[0]) {
                        formData.append("image", fileInput.files[0]);
                    }

                    const response = await fetch(`http://localhost:8080/api/doctors/${userData.doctorId}`, {
                        method: "PUT",
                        body: formData,
                    });

                    if (response.ok) {
                        setIsEditing(false);
                        setPopupMessage({ type: "success", message: "Doctor details updated successfully!" });
                    } else {
                        setPopupMessage({ type: "error", message: "Failed to update Doctor details." });
                    }
                } catch (error) {
                    console.error("Error updating doctor:", error);
                    setPopupMessage({ type: "warning", message: "Check the connection." });
                }
            }
        } else {
            setIsEditing(true);
        }
    };

    // Navigate back
    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className="profile-details-card">
            <div className="profile-page">
                <div className="profile-header-card">
                    <div className="profile-header">
                        <img className="profile-photo1"src={profilePhoto} alt="Profile" style={{ width: "150px", height: "150px", borderRadius: "50%" }} />
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

                <h3>Profile Information</h3>
                <div className="profile-info-container">
                    {[{ label: "Full Name", field: "fullName" },
                        { label: "Address", field: "address" },
                        { label: "Department", field: "department", type: "select", options: departments },
                        { label: "Degree", field: "degree" },
                        { label: "Gender", field: "gender", type: "select", options: ["Male", "Female", "Other"] },
                        { label: "Phone Number", field: "phoneNumber" },
                        { label: "Title", field: "title" },
                        { label: "Description", field: "description" },
                        { label: "Fees", field: "fees" }
                    ].map(({ label, field, type = "text", options }) => (
                        <div className="profile-row" key={field}>
                            <label className="field-label">{label}</label>
                            {isEditing ? (
                                type === "select" ? (
                                    <select className="editable-input" value={userData[field] || ""} onChange={(e) => handleFieldChange(field, e.target.value)} required>
                                        <option value="">Select {label}</option>
                                        {options?.map((option, index) => (
                                            <option key={index} value={option.name || option}>{option.name || option}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <input type={type} className="editable-input" value={userData[field] || ""} onChange={(e) => handleFieldChange(field, e.target.value)} required />
                                )
                            ) : (
                                <span className="field-value">{userData[field]}</span>
                            )}
                        </div>
                    ))}
                </div>

                <div className="button-group">
                    <button className="back-button" onClick={handleBackClick}>
                        <FaAnglesLeft /> Back
                    </button>
                    <button className={`edit-update-btn ${isEditing ? "update-btn" : "edit-btn"}`} onClick={handleEditSave}>
                        {isEditing ? "Update" : "Edit"}
                    </button>
                </div>
            </div>
            <PopupMessage type={popupMessage?.type} message={popupMessage?.message} />
        </div>
    );
}

export default ViewDoctorsPage;
