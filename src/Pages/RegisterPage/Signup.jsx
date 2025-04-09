import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PopupMessage from "../../Components/PopupMessage/popupMessage.jsx"; // Import the PopupMessage component
import "./Signup.css";
import logo from "../../Images/logo/logo-removebg.png";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({}); // Errors state
  const [popup, setPopup] = useState({ type: "", message: "" }); // Popup message state
  const navigate = useNavigate();

  // Validate password in real-time
  const validatePassword = (value) => {
    setPassword(value);

    // Check password length and special character
    const passwordRegex = /^(?=.*[!@#$%^&*()_+{}[\]:;<>,.?/~`\-])[A-Za-z\d!@#$%^&*()_+{}[\]:;<>,.?/~`\-]{8,}$/;
    if (!passwordRegex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 8 characters and contain 1 special character.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "",
      }));
    }
  };

  // Validate confirm password in real-time
  const validateConfirmPassword = (value) => {
    setConfirmPassword(value);
    if (value !== password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match!",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "",
      }));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setPopup({ type: 'hidden', message: 'Processing the request...' });

    // Check if any validation errors exist
    if (errors.password || errors.confirmPassword) {
      return;
    }

    // Ensure all fields are filled
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setPopup({ type: "warning", message: "Please fill in all fields." });
      return;
    }

    try {
      // Step 1: Fetch all employees and check if the email exists
      const response = await axios.get("http://localhost:8080/api/employees/getAllEmployee");

      // Check if email exists in the list of employees as an admin
      const employeeExists = response.data.some(employee => employee.email === email && employee.role == 'admin');

      if (employeeExists) {
        // Step 2: Proceed with signup if email is found
        const adminData = { email, password };
        const signupResponse = await axios.post("http://localhost:8080/api/admins/saveAdmin", adminData);

        if (signupResponse.status === 200) {
          setPopup({ type: "success", message: "Admin Details Saved Successfully"  });
        
          // Delay the navigation to the login page
          setTimeout(() => {
            navigate("/");
          }, 2000); 
        }
        
      } else {
        setPopup({ type: "error", message: "Email not registered as an Admin ." });
      }
    } catch (error) {
      if (error.response) {
        setPopup({ type: "error", message:` ${error.response.data}` });
      } else {
        setPopup({ type: "warning", message: "Please check the network connection " });
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="logo-container">
        <img src={logo} alt="HealthHub Logo" className="logo" />
      </div>

      <div className="signup-box">
        <h2 className="title">Register</h2>

        <form className="form" onSubmit={handleSignup}>

          <div className="input-group">
            <label htmlFor="email" className="label">Email</label>
            <input
              type="email"
              id="email"
              className="input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password" className="label">Password</label>
            <input
              type="password"
              id="password"
              className="input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => validatePassword(e.target.value)}
              required
            />
          </div>

          {/* Display password error or success */}
          {errors.password ? (
            <p className="signup-error">{errors.password}</p>
          ) : (
            password && <p className="signup-success">Strong password</p>
          )}

          <div className="input-group">
            <label htmlFor="confirmPassword" className="label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="input"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => validateConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Display confirm password error */}
          {errors.confirmPassword ? (
            <p className="signup-error">{errors.confirmPassword}</p>
          ) : (
            confirmPassword && <p className="signup-success">Passwords matched</p>
          )}

          <button type="submit" className="button">Register</button>
        </form>

        <p className="login-link">
          Already have an account?{" "}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            Login here
          </a>
        </p>
      </div>

      {/* PopupMessage component for displaying toasts */}
      <PopupMessage type={popup.type} message={popup.message} />
    </div>
  );
};

export default Signup;
