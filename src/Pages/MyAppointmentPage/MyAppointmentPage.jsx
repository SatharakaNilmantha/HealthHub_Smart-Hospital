import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyAppointmentPage.css";
import HeaderContent from "../../Components/HeaderContent/HeaderContent.jsx";
import BodyContent from "../../Components/BoadyContent/BodyContent.jsx";

import mdoctor from "../../Images/doctors/mdoctor.jpg"; // Male doctor image
import ldoctor from "../../Images/doctors/ldoctor.jpg"; // Female doctor image

function MyAppointmentPage() {
  const [appointments, setAppointments] = useState([]);
  const userId = localStorage.getItem("userId") || "";

  useEffect(() => {
    // Fetch all appointments from backend API
    axios
      .get("http://localhost:8080/api/appointments/getAppointments")
      .then(async (response) => {
        if (response.data && Array.isArray(response.data)) {
          // Filter appointments based on logged-in user ID and type (pending or accepted)
          const filteredAppointments = response.data.filter((appointment) => 
            (appointment.patientId == userId) && (appointment.state == "pending" || appointment.state =="accepted")
          );
  
          const appointmentsWithDoctors = await Promise.all(
            filteredAppointments.map(async (appointment) => {
              try {
                const doctorResponse = await axios.get(
                  `http://localhost:8080/api/doctors/${appointment.doctorId}`
                );
                const doctorDetails = doctorResponse.data;
  
                return { ...appointment, doctorDetails };
              } catch (error) {
                console.error(
                  `Error fetching doctor details for doctorId ${appointment.doctorId}:`,
                  error
                );
                return { ...appointment, doctorDetails: null };
              }
            })
          );
  
          setAppointments(appointmentsWithDoctors);
        }
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, [userId]);

  const handleCancelAppointment = async (appointmentId) => {
    const isConfirmed = window.confirm("Are you sure you want to cancel this appointment?");
    
    if (isConfirmed) {
      // Optimistically remove the appointment from the state immediately
      setAppointments((prevAppointments) => 
        prevAppointments.filter(appointment => appointment.appointmentId !== appointmentId)
      );
  
      try {
        const response = await axios.delete(`http://localhost:8080/api/appointments/${appointmentId}`);
        if (response.status !== 200) {
          throw new Error("Failed to cancel appointment");
        }
      } catch (error) {
        console.error("Error canceling appointment:", error);
  
        // Revert the optimistic update if the API call fails
        setAppointments((prevAppointments) => [
          ...prevAppointments, 
          { appointmentId, state: 'pending' } // You can adjust this based on the data structure
        ]);
      }
    }
  };
  
  
  // IntersectionObserver for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-up");
            observer.unobserve(entry.target); // Stop observing after animation
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll(".scroll-animation");

    animatedElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect(); // Cleanup observer on unmount
  }, []);

  return (
    <>
      <HeaderContent />
      <BodyContent>
        <div className="body-content scroll-animation duration-2">
          <h1 className="text-with-underline1">My Appointments</h1>
          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <div key={index} className="appointment-card ">
                <img 
                  src={appointment.doctorDetails?.gender === "Male" ? mdoctor : ldoctor} 
                  alt={appointment.doctorDetails?.fullName} 
                  className='doctor-image' 
                />
                <div className="appointment-details">
                  <div className="row">
                    <div>
                      <h2>{appointment.doctorDetails?.fullName || "Doctor"}</h2> 
                      <p><strong>Doctor Title:</strong> {appointment.doctorDetails?.title}</p>
                    </div>
                    <div><button className="type"><strong>{appointment.type}</strong></button></div>
                  </div>
                  <hr />
                  <div className="row1">
                    <p><strong>Date & Time:</strong> {appointment.appointmentDateTime ? new Date(appointment.appointmentDateTime).toLocaleDateString() + ' ' + new Date(appointment.appointmentDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : 'N/A'}</p>
                    <p> <button className="state"style={{ border: appointment.state === "accept" ? "2px solid green" : appointment.state == "pending" ? " 1px solid #cac301" : "1px solid #12ca01" }} >{appointment.state}</button></p>
                    <p><button className="cancel-appointment" onClick={() => handleCancelAppointment(appointment.appointmentId)}>Cancel Appointment</button></p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="messagenotfound">No appointments found.</p>
          )}
        </div>
      </BodyContent>
    </>
  );
}

export default MyAppointmentPage;
