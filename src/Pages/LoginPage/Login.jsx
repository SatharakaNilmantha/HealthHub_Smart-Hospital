import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PopupMessage from "../../Components/PopupMessage/popupMessage.jsx";
import "./Login.css"; // Import your CSS file
import logo from "../../Images/logo/logo-removebg.png"; // Correct path to logo image

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setPopupMessage] = useState({ type: "", message: "" });
  const navigate = useNavigate();


  useEffect(() => {
    // Prevent back navigation after logout
    window.history.replaceState(null, null, window.location.href);
    window.addEventListener("popstate", () => {
      navigate("/", { replace: true });
    });

    // Clear stored session data (ensuring no access to the previous page)
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userEmail");

    return () => {
      window.removeEventListener("popstate", () => {
        navigate("/", { replace: true });
      });
    };
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    setPopupMessage({ type: 'hidden', message: 'Processing the request...' });

    if (!email.trim() || !password.trim()) {
      setPopupMessage({ type: "error", message: "Please enter both email and password." });
      return;
    }

    try {
      // Sending the login request to the backend
      const response = await fetch("http://localhost:8080/api/registerDoctors/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setPopupMessage({ type: "success", message: data.message });

        // Save the email to localStorage after successful login
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);


        // Log the stored email to the console
        console.log("Email saved to localStorage:", email);
        console.log("Password saved to localStorage:", password);



        // Delay navigation to the dashboard for 2000ms
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        const errorData = await response.json(); // Get the error message from the backend
        setPopupMessage({ type: "error", message: errorData.message || "Invalid email or password." });
      }
    } catch (error) {
      setPopupMessage({ type: "warning", message: "Please check the network connection." });
    }
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
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="button">
            Login
          </button>
        </form>

        <p className="signup-link">
          Create a new account?{" "}
          <a
            href="/signup"
            onClick={(e) => {
              e.preventDefault();
              navigate("/signup");
            }}
          >
            Register
          </a>
        </p>
      </div>

      {/* Use PopupMessage component to show notifications */}
      <PopupMessage type={notification.type} message={notification.message} />
    </div>
  );
};

export default Login;
