import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyProfilePage.css";
import HeaderContent from "../../Components/HeaderContent/HeaderContent";
import PopupMessage from "../../Components/PopupMessage/popupMessage.jsx";

function MyProfilePage() {
    const userId = localStorage.getItem("userId") || "";
    const [userData, setUserData] = useState({
        fullName: "",
        dob: "",
        address: "",
        gender: "",
        phoneNumber: "",
    });

    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [toastData, setToastData] = useState({ type: "", message: "" });
    const [passwordStrength, setPasswordStrength] = useState("");

    useEffect(() => {
        if (userId) {
            axios
                .get(`http://localhost:8080/api/patient/${userId}`)
                .then((response) => {
                    setUserData(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching patient data:", error);
                    setToastData({ type: "error", message: "Failed to fetch user data." });
                });
        }
    }, [userId]);

    const handleFieldChange = (field, value) => {
        setUserData((prevData) => ({ ...prevData, [field]: value }));
    };

    const handlePasswordChange = (field, value) => {
        setPasswords((prevData) => ({ ...prevData, [field]: value }));

        // Only validate for the new password field
        if (field === "newPassword") {
            validatePassword(value);
        }
    };

    const handleEditToggle = (e) => {
        e.preventDefault();
        setIsEditing(!isEditing);
    };

    const handleSave = (e) => {
        e.preventDefault();

        setToastData({ type: "hidden", message: " " }); // Fixed typo
        
        const confirmed = window.confirm("Do you want to save the changes?");
        if (confirmed) {
            axios
                .put(`http://localhost:8080/api/patient/${userId}`, userData)
                .then(() => {
                    setToastData({ type: "success", message: "Profile updated successfully!" });
                    setIsEditing(false);
                })
                .catch((error) => {
                    console.error("Error updating profile:", error);
                    setToastData({ type: "error", message: "Failed to update profile." });
                });
        }
    };

    const handlePasswordUpdate = (e) => {
      
        e.preventDefault();

        if (passwords.newPassword !== passwords.confirmPassword) {
            setToastData({ type: "error", message: "New password and confirm password do not match." });
            return;
        }

        axios
            .put(`http://localhost:8080/api/patient/changePassword/${userId}`, {
                currentPassword: passwords.currentPassword,
                password: passwords.newPassword,
            })
            .then((response) => {
                setToastData({ type: "success", message: response.data });
                setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" }); // Clear fields
            })
            .catch((error) => {
                console.error("Error updating password:", error);
                setToastData({ type: "error", message: error.response?.data || "Failed to update password." });
            });
    };

    const validatePassword = (password) => {
        const strongPasswordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

        if (password.length === 0) {
            setPasswordStrength("");
        } else if (strongPasswordRegex.test(password)) {
            setPasswordStrength("Strong Password");
        } else {
            setPasswordStrength("Weak Password - Must be at least 8 characters with 1 number & 1 special character.");
        }
    };

    return (
        <>
            <HeaderContent />
            <PopupMessage type={toastData.type} message={toastData.message} />

            <div className="profile-page">
                <div className="profile-details-card">
                    <h3>Profile Information</h3>

                    <div className="profile-row">
                        <label className="field-label">Full Name</label>
                        {isEditing ? (
                            <input type="text" className="editable-input" value={userData.fullName} onChange={(e) => handleFieldChange("fullName", e.target.value)} required />
                        ) : (
                            <span className="field-value">{userData.fullName}</span>
                        )}
                    </div>

                    <div className="profile-row">
                        <label className="field-label">Date of Birth</label>
                        {isEditing ? (
                            <input type="date" className="editable-input" value={userData.dob} onChange={(e) => handleFieldChange("dob", e.target.value)} />
                        ) : (
                            <span className="field-value">{userData.dob}</span>
                        )}
                    </div>

                    <div className="profile-row">
                        <label className="field-label">Address</label>
                        {isEditing ? (
                            <textarea className="editable-input" value={userData.address} onChange={(e) => handleFieldChange("address", e.target.value)} rows="3" />
                        ) : (
                            <span className="field-value">{userData.address}</span>
                        )}
                    </div>

                    <div className="profile-row">
                        <label className="field-label">Gender</label>
                        {isEditing ? (
                            <select className="editable-input" value={userData.gender} onChange={(e) => handleFieldChange("gender", e.target.value)}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        ) : (
                            <span className="field-value">{userData.gender}</span>
                        )}
                    </div>

                    <div className="profile-row">
                        <label className="field-label">Phone Number</label>
                        {isEditing ? (
                            <input type="text" className="editable-input" value={userData.phoneNumber} onChange={(e) => handleFieldChange("phoneNumber", e.target.value)} required />
                        ) : (
                            <span className="field-value">{userData.phoneNumber}</span>
                        )}
                    </div>

                    <div className="action-links">
                        {!isEditing ? (
                            <a href="#" className="link edit-link" onClick={handleEditToggle}>Edit</a>
                        ) : (
                            <a href="#" className="link save-link" onClick={handleSave}>Save</a>
                        )}
                    </div>
                </div>

                {/* Change Password Section */}
                <div className="profile-details-card">
                    <h3>Change Password</h3>

                    <div className="profile-row">
                        <label className="field-label">Current Password</label>
                        <input type="password" className="editable-input" value={passwords.currentPassword} onChange={(e) => handlePasswordChange("currentPassword", e.target.value)} required />
                    </div>

                 <div className="profile-row1">
                    <div className="profile-row">
                        <label className="field-label">New Password</label>
                        <input type="password" className="editable-input"  value={passwords.newPassword} onChange={(e) => handlePasswordChange("newPassword", e.target.value)} required/>
                    </div>
                    {/* Live password strength message */}
                    <p className={`password-strength ${passwordStrength === "Strong Password" ? "strong" : "weak"}`}>{passwordStrength} </p>
                </div>
                    <div className="profile-row">
                        <label className="field-label">Confirm Password</label>
                        <input type="password" className="editable-input" value={passwords.confirmPassword} onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)} required />
                    </div>

                    <div className="action-links">
                        <a href="#" className="link save-link" onClick={handlePasswordUpdate}>Update</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyProfilePage;
