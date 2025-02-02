import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Calendar from 'react-calendar';
import { FaAnglesLeft } from "react-icons/fa6";
import 'react-calendar/dist/Calendar.css';
import './AppointmentPage.css';

function ConsultationAppointmentPage() {
    const location = useLocation();
    const doctor = location.state || {};
    const today = new Date();
    const twoMonthsLater = new Date();
    twoMonthsLater.setMonth(today.getMonth() + 2);

    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedTime, setSelectedTime] = useState(null);
    const [bookingConfirmation, setBookingConfirmation] = useState("");

    const generateTimeSlotsForDay = (dayOfWeek) => {
        let start, end, interval = 30;
        switch (dayOfWeek) {
            case 0: start = new Date(0, 0, 0, 11, 0); end = new Date(0, 0, 0, 15, 0); break;
            case 6: start = new Date(0, 0, 0, 9, 0); end = new Date(0, 0, 0, 12, 0); break;
            default: start = new Date(0, 0, 0, 10, 0); end = new Date(0, 0, 0, 16, 0); break;
        }

        const times = [];
        let currentTime = new Date(start);
        while (currentTime < end) {
            times.push(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            currentTime.setMinutes(currentTime.getMinutes() + interval);
        }
        return times;
    };

    const timeSlots = generateTimeSlotsForDay(selectedDate.getDay());

    const handleTimeClick = (time) => setSelectedTime(time);
    const handleDateClick = (date) => {
        setSelectedDate(date);
        setSelectedTime(null);
    };

    const handleBooking = () => {
        if (selectedDate && selectedTime) {
            const formattedDate = selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
            setBookingConfirmation({ message: `Appointment booked on ${formattedDate} at ${selectedTime}`, color: 'green' });
        } else {
            setBookingConfirmation({ message: "Please select both a date and time.", color: 'red' });
        }
    };

    const navigate = useNavigate();
    const handleBackClick = () => navigate(-1);

    return (
        <div className="body">
            <div className="appointment-container">
                <header className="header">
                    <h1>Appointment Booking</h1>
                </header>

                
                <div className="doctor-info">
                    <img src={doctor.imgSrc} alt={doctor.name} className="doctor-image" />
                    <div className="doctor-details">
                        <h2>{doctor.name} <span className="verified-badge">✔</span></h2>
                        <p>{doctor.specialization} | {doctor.years} Years</p>
                        <p className="fee">Appointment Fee: <strong>{doctor.fee}</strong></p>
                    </div>
                </div>

                <div className="booking-section">
                    <h3>Booking Slots</h3>
                    <div className="booking-container">
                        <Calendar
                            onChange={handleDateClick}
                            value={selectedDate}
                            minDate={today}
                            maxDate={twoMonthsLater}
                        />

                        <div className="time-selector">
                            {timeSlots.map((time, index) => (
                                <div key={index} className={`time ${selectedTime === time ? 'selected' : ''}`} onClick={() => handleTimeClick(time)}>
                                    {time}
                                </div>
                            ))}
                        </div>

                        <button className="booking-button" onClick={handleBooking}>Book an appointment</button>
                        <div className="confirmation-message" style={{ color: bookingConfirmation.color }}>{bookingConfirmation.message}</div>
                    </div>
                </div>

                <button className="back-button" onClick={handleBackClick}><FaAnglesLeft /> Back</button>
            </div>
        </div>
    );
}

export default ConsultationAppointmentPage;
