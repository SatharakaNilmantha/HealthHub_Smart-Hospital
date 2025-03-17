import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import './EditEmployeePage.css';
import { FaAnglesLeft } from "react-icons/fa6";

function EditEmployeePage() {
    const { state: employee } = useLocation();
    const [userData, setUserData] = useState(employee || {});
    const [profilePhoto, setProfilePhoto] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        if (employee?.profilePhoto) {
            setProfilePhoto(employee.profilePhoto);
        }
    }, [employee]);

    const handleFieldChange = (field, value) => {
        setUserData((prevData) => ({ ...prevData, [field]: value }));
    };

    const handleEditSave = () => {
        if (isEditing) {
            const confirmed = window.confirm("Do you want to save the changes?");
            if (confirmed) {
                setIsEditing(false);
            }
        } else {
            setIsEditing(true);
        }
    };

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

    const handleBackClick = () => {
        navigate(-1); // Navigates to the previous page dynamically
    };

    return (
        <div className="profile-details-card">
            <div className="profile-page">
                {/* Profile Header */}
                <div className="profile-header-card">
                    <div className="profile-header">
                        <img className="profile-photo" src={profilePhoto} alt="Profile" />
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
                {Object.keys(userData).map((key) => (
                    <div key={key} className="profile-row">
                        <label className="field-label">{key}</label>
                        {isEditing ? (
                            <input
                                type="text"
                                className="editable-input"
                                value={userData[key]}
                                onChange={(e) => handleFieldChange(key, e.target.value)}
                                required
                            />
                        ) : (
                            <span className="field-value">{userData[key]}</span>
                        )}
                    </div>
                ))}

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
        </div>
    );
}

export default EditEmployeePage;
