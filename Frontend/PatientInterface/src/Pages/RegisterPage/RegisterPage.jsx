import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import PopupMessage from '../../Components/PopupMessage/popupMessage.jsx';
import './RegisterPage.css';

function RegisterPage() {
    const navigate = useNavigate();
    const [toastData, setToastData] = useState({ type: "", message: "" });
    const [passwordStrengthMessage, setPasswordStrengthMessage] = useState("");
    const [passwordStrengthMessageColour, setPasswordStrengthMessageColour] = useState("red");
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    function calculateAge(dob) {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        if (today.getMonth() < birthDate.getMonth() || 
            (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function validatePassword(password) {
        const minLength = password.length >= 8;
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (!minLength) {
            setPasswordStrengthMessage("❌ Password must be at least 8 characters long.");
            setPasswordStrengthMessageColour("red");
            setIsPasswordValid(false);
        } else if (!hasNumber) {
            setPasswordStrengthMessage("❌ Password must contain at least one number.");
            setPasswordStrengthMessageColour("red");
            setIsPasswordValid(false);
        } else if (!hasSpecialChar) {
            setPasswordStrengthMessage("❌ Password must contain at least one special character.");
            setPasswordStrengthMessageColour("red");
            setIsPasswordValid(false);
        } else {
            setPasswordStrengthMessage("✅ Strong Password");
            setPasswordStrengthMessageColour("green");
            setIsPasswordValid(true);
        }
    }

     

    function handleRegister(e) {
        setToastData({ type: "hidden", message: "Processing your registration..." }); 

        e.preventDefault();
        
        if (!isPasswordValid) {
            setToastData({ type: "error", message: "Please enter a strong password before registering." });
            return;
        }
        

        const dob = document.getElementById('dob').value;
        const age = calculateAge(dob);

        const patientData = {
            fullName: document.getElementById('fullname').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            phoneNumber: document.getElementById('phonenumber').value,
            gender: document.getElementById('gender').value,
            dob: dob,
            age: age,
            address: document.getElementById('address').value
        };

        axios.post('http://localhost:8080/api/patient/savePatient', patientData)
            .then(response => {
                setToastData({ type: "success", message: "Registration Successful!" });
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            })
            .catch(error => {
                if (error.response) {
                    setToastData({ type: "error", message: error.response.data });
                } else {
                    setToastData({ type: "warning", message: "Registration failed. Please check the connection." });
                }
            });
    }

    return (
        <div className='register-body'>
            <div className="register-page">
                <div className="register-container">
                    <h1>Register</h1>
                    <form onSubmit={handleRegister} className="register-form">
                        <div className="input-group">
                            <label htmlFor="fullname">Full Name</label>
                            <input type="text" id="fullname" placeholder="Enter your full name" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Enter your email" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                placeholder="Enter your password" 
                                required 
                                onChange={(e) => validatePassword(e.target.value)}
                            />
                            <small className={`password-message ${isPasswordValid ? 'valid' : 'invalid'}`} style={{ color: passwordStrengthMessageColour }}>{passwordStrengthMessage}</small>
                        </div>

                        <div className="form-columns">
                            <div className="input-group">
                                <label htmlFor="phonenumber">Phone Number</label>
                                <input type="text" id="phonenumber" placeholder="Enter your phone number" required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="gender">Gender</label>
                                <select id="gender" required>
                                    <option value="" disabled selected>Select your gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="dob">Date of Birth</label>
                            <input type="date" id="dob" required />
                        </div>

                        <div className="input-group">
                            <label htmlFor="address">Address</label>
                            <textarea id="address" placeholder="Enter your address" required rows="2"></textarea>
                        </div>

                        <button className='register-button' type="submit">Register</button>
                    </form>
                    <p>
                        Already have an account? <Link to="/login">Login here</Link>
                    </p>
                </div>
            </div>

            <PopupMessage type={toastData.type} message={toastData.message} />
        </div>
    );
}

export default RegisterPage;
