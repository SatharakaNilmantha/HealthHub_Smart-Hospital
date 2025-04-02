import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "./AccountPage.css";
import PopupMessage from "../../Components/PopupMessage/popupMessage.jsx";
import SideNav from "../../Components/SideNav/SideNav.jsx";
import { IoLogOutOutline } from "react-icons/io5";

function AccountPage() {
    const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "");

    useEffect(() => {
        const storedEmail = localStorage.getItem("userEmail");
        if (storedEmail) {
            setUserEmail(storedEmail);
        }
    }, []);

    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [toastData, setToastData] = useState({ type: "", message: "" });
    const [passwordStrength, setPasswordStrength] = useState("");
    const [passwordError, setPasswordError] = useState("");



    // Handle password input change
    const handlePasswordChange = (field, value) => {
        setPasswords((prev) => ({ ...prev, [field]: value }));

        if (field === "newPassword") {
            validatePassword(value);
        }
    };

    // Validate password strength
    const validatePassword = (password) => {
        const strongPasswordRegex = /^(?=.*[!@#$%^&*()_+{}[\]:;<>,.?/~`\-])[A-Za-z\d!@#$%^&*()_+{}[\]:;<>,.?/~`\-]{8,}$/;

        if (password.length == 0) {
            setPasswordStrength("");
        } else if (strongPasswordRegex.test(password)) {
            setPasswordStrength("Strong Password");
        } else {
            setPasswordStrength("Password must be at least 8 characters and contain 1 special character.");
        }
    };

    // check New password and confirm password  match.
    useEffect(() => {
        if (!passwords.newPassword || !passwords.confirmPassword) {
            setPasswordError(""); // Clear error if fields are empty
        } else if (passwords.newPassword !== passwords.confirmPassword) {
            setPasswordError("New password and confirm password do not match.");
        } else {
            setPasswordError("Passwords match");
        }
    }, [passwords.newPassword, passwords.confirmPassword]);
    

    // Handle password update
    const handlePasswordUpdate = async (e) => {
        e.preventDefault();

        setToastData({ type: "hiddne", message: "" });

        if (passwords.newPassword !== passwords.confirmPassword) {
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8080/api/registerDoctors/changePassword/${userEmail}`, {
                currentPassword: passwords.currentPassword,
                password: passwords.newPassword,
            });

            setToastData({ type: "success", message: response.data });
            setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" }); // Clear fields
        } catch (error) {
            console.error("Error updating password:", error);
            setToastData({ type: "error", message: error.response?.data || "Failed to update password." });
        }
    };


    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            // Clear user session data
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("userEmail");

            // Redirect to login page
            navigate("/", { replace: true });

            // Prevent going back to previous page
            setTimeout(() => {
                window.history.pushState(null, null, window.location.href);
            }, 0);

            // Listen for back button and force logout page
            window.addEventListener("popstate", function () {
                window.history.pushState(null, null, window.location.href);
            });
        }
    };

 

    
    
    return (
        <>
            <div className="app-container">
                <SideNav />
                <div className="content">
                    <p style={{ textAlign: "end", cursor: "pointer"  , color:"red" , fontWeight:"bold"}} onClick={handleLogout}><strong style={{fontSize:"20px"}}><IoLogOutOutline /></strong>Log Out</p>
                    <div className="profilepage">
                        <h3>Change Password</h3>
                        <form onSubmit={handlePasswordUpdate}>
                            <div className="profile-row1">
                                <label className="field-label">Current Password</label>
                                <input
                                    type="password"
                                    className="editable-input"
                                    value={passwords.currentPassword}
                                    onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="profile-row1">
                                <label className="field-label">New Password</label>
                                <input
                                    type="password"
                                    className="editable-input"
                                    value={passwords.newPassword}
                                    onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                                    required
                                />
                            </div>
                            <p className={`password-strength ${passwordStrength === "Strong Password" ? "strong" : "weak"}`}>{passwordStrength}</p>

                            <div className="profile-row1">
                                <label className="field-label">Confirm Password</label>
                                <input
                                    type="password"
                                    className="editable-input"
                                    value={passwords.confirmPassword}
                                    onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                                    required
                                />
                            </div>
                            <p className={`password-error ${passwordError === "Passwords match" ? "match" : "notmatch"}`}>{passwordError}</p>


                            <div className="actionlinks">
                                <button type="submit" className="Update-link">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {toastData.message && <PopupMessage type={toastData.type} message={toastData.message} />}
        </>
    );
}

export default AccountPage;
