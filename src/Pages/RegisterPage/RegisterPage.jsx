import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import PopupMessage from '../../Components/PopupMessage/popupMessage.jsx';
import './RegisterPage.css';

function RegisterPage() {
    const navigate = useNavigate();
    const [toastData, setToastData] = useState({ type: "", message: "" });
  

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

    function handleRegister(e) {
        e.preventDefault();
        
        // Show an initial message when the button is clicked
        setToastData({ type: "hiddne", message: "Processing your registration..." });
     
    

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
            .catch(function (error) {
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
                            <input type="password" id="password" placeholder="Enter your password" required />
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
                            <textarea id="address" placeholder="Enter your address" required rows="3"></textarea>
                        </div>

                        <button className='register-button' type="submit">Register</button>
                    </form>
                    <p>
                        Already have an account? <Link to="/login">Login here</Link>
                    </p>
                </div>
            </div>

            {/* Show popup message only when needed */}
            <PopupMessage type={toastData.type} message={toastData.message} />
        </div>
    );
}

export default RegisterPage;
