import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaAnglesLeft } from "react-icons/fa6";
import axios from 'axios';
import PopupMessage from '../../Components/PopupMessage/popupMessage.jsx'; // Import PopupMessage component
import './AppointmentPage.css';

function ConsultationAppointmentPage() {
  const location = useLocation();
  const doctor = location.state || {};

  const [message, setMessage] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [appointment, setAppointment] = useState({
    doctorId: doctor.doctorId || '',
    patientId: localStorage.getItem('userId') || '',
    appointmentDateTime: '',
    type: 'Consultation',
    state: 'pending',
  });

  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');

  // Fetch doctor's appointments on component load or when doctorId changes
  useEffect(() => {
    if (appointment.doctorId) {
      const fetchDoctorAppointments = async () => {
        try { const response = await axios.get(  `http://localhost:8080/api/appointments/getAppointmentsByDoctor/${appointment.doctorId}`);
          setDoctorAppointments(response.data);
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      };

      fetchDoctorAppointments();
    }
  }, [appointment.doctorId]);

  // Generate time slots based on the selected day
  const generateTimeSlotsForDay = (dayOfWeek) => {
    let start, end;
    const interval = 15; // 15-minute intervals


    switch (dayOfWeek) {
        case 0: // Sunday
          start = new Date(0, 0, 0, 8, 0);
          end = new Date(0, 0, 0, 12, 0);
          break;
        case 6: // Saturday
          start = new Date(0, 0, 0, 9, 0);
          end = new Date(0, 0, 0, 12, 0);
          break;
        default: // Monday - Friday
          start = new Date(0, 0, 0, 7, 0);
          end = new Date(0, 0, 0, 12, 0);
          break;
      }

    let slots = [];
    let currentTime = new Date(start);

    while (currentTime <= end) {
      slots.push(currentTime.toTimeString().slice(0, 5)); // Format HH:MM
      currentTime.setMinutes(currentTime.getMinutes() + interval);
    }

    return slots;
  };

  // Handle date selection and filter out booked slots
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const dayOfWeek = new Date(selectedDate).getDay(); // Get weekday (0 = Sunday, 6 = Saturday)

    // Extract booked time slots for this date
    const bookedForDate = doctorAppointments
      .filter((appt) => appt.appointmentDateTime.startsWith(selectedDate))
      .map((appt) => new Date(appt.appointmentDateTime).toTimeString().slice(0, 5));

    setBookedSlots(bookedForDate);

    // Generate time slots and remove booked ones
    const slots = generateTimeSlotsForDay(dayOfWeek).filter((slot) => !bookedForDate.includes(slot));
    setAvailableTimeSlots(slots);
    setAppointment({ ...appointment, appointmentDateTime: selectedDate });
  };

  // Handle time selection
  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    // Set the full appointment date-time by combining selected date and time
    const newDateTime = `${appointment.appointmentDateTime.split('T')[0]}T${selectedTime}:00`;

    setAppointment({
      ...appointment,
      appointmentDateTime: newDateTime,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();


      // Check if the user is signed in (assuming you store the user info in local storage)
      if (!userEmail) {
        setMessage({text: 'You must be logged in to book an appointment!', type: 'warning',});
        return; // Stop the submission process if the user is not signed in
      }


    // Show an initial message when the button is clicked
    setMessage({ type: "hidden", message: "Processing your login..." });

    try {
      const response = await axios.post(
        'http://localhost:8080/api/appointments/saveAppointment',
        appointment
      );
      setMessage({text: response.data + ' ' + new Date(appointment.appointmentDateTime).toLocaleDateString() + ' ' +  (appointment.appointmentDateTime ? new Date(appointment.appointmentDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : ''),type: 'success' });
      
      // Refresh appointments after booking
      setDoctorAppointments((prevAppointments) => [...prevAppointments, appointment]);
      setBookedSlots((prevBookedSlots) => [
        ...prevBookedSlots,
        appointment.appointmentDateTime.split('T')[1],
      ]);
      setAvailableTimeSlots((prevAvailableSlots) =>
        prevAvailableSlots.filter(
          (slot) => slot !== appointment.appointmentDateTime.split('T')[1]
        )
      );
      setTimeout(() => {
        window.location.reload(); // Reload the page after booking
      }, 2000); // Wait for 2 seconds to let the toast show
    } catch (error) {
      setMessage({
        text: 'That date and time are already booked.',
        type: 'error',
      });
    }
  };

  // Calculate the min and max dates (tomorrow to 14 days later)
  const today = new Date();
  today.setDate(today.getDate() + 1); // Tomorrow
  const minDate = today.toISOString().split('T')[0];

  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 14); // 14 days from tomorrow
  const maxDateFormatted = maxDate.toISOString().split('T')[0];

  //---------------------------------------------handle back link using navigate hook---------------------------------//
  
  const navigate = useNavigate(); // Initialize the navigate function
  
  const handleBackClick = () => {
      navigate(-1); // This will navigate to the previous page in the history stack
  };

  return (
    <div className="appointment-form">
      <h2 className='appointment-title'>Consultation Appointment Details</h2>

      <div className="doctor-info1">
        <div><img src={doctor.imgSrc} alt={doctor.name} className="doctor-image1" /></div>
        <div className="doctor-details1">
          <h2>{doctor.name} <span className="verified-badge">✔</span></h2>
          <p className="description">{doctor.description}</p>
          <p className="fees"> Treatment Fee: <strong>${doctor.fees}</strong></p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="appointmentDate">Select Date:</label>
          <input type="date" id="appointmentDate" name="appointmentDate" value={appointment.appointmentDateTime.split('T')[0] || ''} onChange={handleDateChange} min={minDate} max={maxDateFormatted}/>
        </div>

        <div className="form-group">
          <label htmlFor="appointmentTime">Available Time Slots:</label>
          <select id="appointmentTime" name="appointmentTime" onChange={handleTimeChange} disabled={availableTimeSlots.length ===0} >
            {availableTimeSlots.length > 0 ? (
              availableTimeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))
            ) : (
              <option>No available slots</option>
            )}
          </select>
        </div>

        <div className="summary">
          <h3>Appointment Summary:</h3>
            <div className="state1" >
            <p> <strong>Appointment Date:</strong> {appointment.appointmentDateTime ? new Date(appointment.appointmentDateTime).toLocaleDateString() : 'Not selected'} </p>
            <p> <strong>Appointment Time:</strong> {appointment.appointmentDateTime ? new Date(appointment.appointmentDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : 'Not selected'}</p>
            </div>
       </div>

        <div className="button-group">
            <button className="back-button" onClick={handleBackClick}><FaAnglesLeft /> Back</button>
            <button type="submit" className='submit' disabled={availableTimeSlots.length === 0}>Save Appointment</button>
        </div>
      </form>

      <PopupMessage type={message.type} message={message.text} /> {/* Popup message component */}
    </div>
  );
}

export default ConsultationAppointmentPage;
