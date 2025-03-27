import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';
import PopupMessage from '../../Components/PopupMessage/popupMessage.jsx'; // Import the PopupMessage component

const LoginPage = () => {
    const navigate = useNavigate(); // Initialize the navigate function
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [toastData, setToastData] = useState({ type: '', message: '' }); // State to handle toast message

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Show an initial message when the button is clicked
        setToastData({ type: "hidden", message: "Processing your login..." });

        try {
            const response = await fetch(
                `http://localhost:8080/api/patient/login?email=${email}&password=${password}`,
                {
                    method: 'POST',
                }
            );

            // Check if the response is OK
            if (response.ok) {
                const data = await response.json();
                console.log("Response Data: ", data);  // Log the full response

                if (data.patientId) { // Check if patientId exists in the response
                    setToastData({ type: 'success', message: data.message || 'Login Successful!' });

                    // Store the email and patientId in localStorage
                    localStorage.setItem('userEmail', email);
                    localStorage.setItem('userId', data.patientId); // Assuming `data.patientId` is the patient ID returned from the server
                    localStorage.setItem('isLoggedIn', 'true');

                    console.log(email);
                    console.log(data.patientId); // Log the patientId

                    // Redirect after a small delay to give user feedback
                    setTimeout(() => {
                        navigate('/'); // Navigate to home or another page
                    }, 2000);
                } else {
                    setToastData({ type: 'error', message: 'Patient ID not found in the response' }); 
                }
            } else {
                const errorData = await response.json(); 
                setToastData({ type: 'error', message: errorData.message || 'Invalid Email or Password' }); // Show error message
            }
        } catch (error) {
            setToastData({ type: 'warning', message: 'Please check the connection.' }); // Show warning message
        }
    };

    return (
        <div className="login-body">
            <div className="login-page">
                <div className="login-container">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}> {/* Attach onSubmit to the form */}
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button className="log-button" type="submit">
                            Login
                        </button>
                    </form>

                    {/* Show popup message every time the button is clicked */}
                    {toastData.message && (
                        <PopupMessage 
                            type={toastData.type} 
                            message={toastData.message} 
                        />
                    )}

                    <p>Create a new account? <Link to='/register'>Click here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
