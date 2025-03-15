import React, { useState } from 'react';
import './AccountSection.css';
import profilePhoto from '../../Images/Account/profile.jpg';

const AccountSection = () => {
  // State for profile details
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('Jhoanne Smith');
  const [dob, setDob] = useState('9/12/2000');
  const [gender, setGender] = useState('Male');
  const [country, setCountry] = useState('Sri Lanka');

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Handle inline editing (onBlur event to save the changes)
  const handleChange = (e, field) => {
    const value = e.target.innerText;
    if (field === 'fullName') setFullName(value);
    if (field === 'dob') setDob(value);
    if (field === 'gender') setGender(value);
    if (field === 'country') setCountry(value);
  };

  return (
    <div className="account-card fixed-height">
      <h1>Personalize Your Account</h1>
      <p>Your profile photo will appear on apps and devices that use your account.</p>

      <div className="profile-photo-section">
        <img src={profilePhoto} alt="Profile" className="profile-photo" />
        <button className="change-photo-btn">Change Photo</button>
      </div>

      <div className="profile-info">
        <h2>Profile Information</h2>
        <div className="info-item">
          <label>Full Name:</label>
          <div
            contentEditable={isEditing}
            onBlur={(e) => handleChange(e, 'fullName')}
            suppressContentEditableWarning={true}
            className="editable-text"
          >
            {fullName}
          </div>
        </div>
        <div className="info-item">
          <label>Date of Birth:</label>
          <div
            contentEditable={isEditing}
            onBlur={(e) => handleChange(e, 'dob')}
            suppressContentEditableWarning={true}
            className="editable-text"
          >
            {dob}
          </div>
        </div>
        <div className="info-item">
          <label>Gender:</label>
          <div
            contentEditable={isEditing}
            onBlur={(e) => handleChange(e, 'gender')}
            suppressContentEditableWarning={true}
            className="editable-text"
          >
            {gender}
          </div>
        </div>
        <div className="info-item">
          <label>Country/Region:</label>
          <div
            contentEditable={isEditing}
            onBlur={(e) => handleChange(e, 'country')}
            suppressContentEditableWarning={true}
            className="editable-text"
          >
            {country}
          </div>
        </div>
        <button className="edit-btn" onClick={handleEdit}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
    </div>
  );
};

export default AccountSection;
