import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Import CSS file
import logo from "../../Images/logo/logo-removebg.png"; // Correct path to logo image

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      alert("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Signup Successful! (No backend yet)");
    navigate("/login"); // Navigate to the Login page after successful registration
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleLoginClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    navigate("/login"); // Navigate to the Login page
  };

  return (
    <div className="signup-container">
      {/* Logo positioned at the top left */}
      <div className="logo-container">
        <img src={logo} alt="HealthHub Logo" className="logo" />
      </div>

      {/* Signup form centered */}
      <div className="signup-box">
        <h2 className="title">Register</h2>

        <form className="form" onSubmit={handleSignup}>
          <div className="input-group">
            <label htmlFor="email" className="label">Email</label>
            <input type="email" id="email" className="input" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="input-group">
            <label htmlFor="password" className="label">Password</label>
            <input type="password" id="password" className="input" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword" className="label">Confirm Password</label>
            <input type="password" id="confirmPassword" className="input" placeholder="Re-enter your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required  />
          </div>

          <div className="input-group">
            <label htmlFor="photo" className="label">Upload Photo</label>
            <input type="file" id="photo" className="input" onChange={handlePhotoChange} accept="image/*" />
          </div>

          <button type="submit" className="button">Register</button>
        </form>

        <p className="login-link">
          Already have an account?{" "}
          <a href="/login" onClick={handleLoginClick}>Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
