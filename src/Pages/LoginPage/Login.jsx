import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import CSS file
import logo from "../../Images/logo/logo-removebg.png"; // Correct path to logo image

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert("Please enter both email and password.");
      return;
    }
    alert("Login Successful! (No backend yet)");
    navigate("/dashboard"); // Navigate to the dashboard
  };

  return (
    <div className="login-container">
      {/* Logo positioned at the top left */}
      <div className="logo-container">
        <img src={logo} alt="HealthHub Logo" className="logo" />
      </div>

      {/* Login form centered */}
      <div className="login-box">
        <h2 className="title">Login</h2>

        <form className="form" onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input type="email" id="email"  className="input" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="input-group">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input type="password" id="password" className="input" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          </div>
          <button type="submit" className="button">
            Login
          </button>
        </form>

        <p className="signup-link">
          Create a new account? <a href="/signup" onClick={(e) => { e.preventDefault(); navigate("/signup"); }}>Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
