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
    const navigate = useNavigate();

    // Update profile photo when gender changes
    useEffect(() => {
        setProfilePhoto(userData.profilePhoto || getDefaultProfilePhoto(userData.gender));
    }, [userData.gender]);

    // Navigate back
    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className="profile-details-card">
            <div className="profile-page">
                <div className="profile-header-card">
                    <div className="profile-header">
                        <img className="profile-photo1" src={profilePhoto} alt="Profile" style={{ width: "150px", height: "150px", borderRadius: "50%" }} />
                    </div>
                </div>

                <h3>Profile Information</h3>
                <div className="profile-info-container">
                    {[{ label: "Full Name", field: "fullName" },
                        { label: "Address", field: "address" },
                        { label: "Department", field: "department" },
                        { label: "Degree", field: "degree" },
                        { label: "Gender", field: "gender" },
                        { label: "Phone Number", field: "phoneNumber" },
                        { label: "Title", field: "title" },
                        { label: "Description", field: "description" },
                        { label: "Fees", field: "fees" }
                    ].map(({ label, field }) => (
                        <div className="profile-row" key={field}>
                            <label className="field-label">{label}</label>
                            {field === "fees" ? (
                                <span className="field-value">$ {userData[field] || "Not Available"}</span>
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
                </div>
            </div>
        </div>
    );
}

export default ViewDoctorsPage;
