import React, { useEffect, useState } from "react";

import './MyAppointmentPage.css';
import HeaderContent from '../../Components/HeaderContent/HeaderContent.jsx';
import BodyContent from '../../Components/BoadyContent/BodyContent.jsx'; 


import doctor1 from '../../images/logo/logo.png';

function MyAppointmentPage() {

  //----------------------------------scroll direction code ------------------------------------//
  
  // IntersectionObserver to trigger animation when elements come into the viewport
     useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-up');
          observer.unobserve(entry.target); // Stop observing after animation
        }
      });
    }, {
      threshold: 0.1 // Trigger when 10% of the element is in the viewport
    });
  
    // Observe all the elements with the 'scroll-animation' class
    const animatedDivs = document.querySelectorAll('.scroll-animation');
  
    animatedDivs.forEach(div => {observer.observe(div);});
    
    return () => {
      observer.disconnect(); // Clean up observer on component unmount
    };
     }, []);


  return (
    <>
      <HeaderContent />
      <BodyContent>
        <div className="body-content scroll-animation duration-2">
          <h1 className="text-with-underline1 ">My Appointments</h1> 

          <div className="appointment-card scroll-animation duration-2">
              <img src={doctor1} alt="Doctor" className="doctor-image" />

              <div className="appointment-details">
                <div className="row">
                  <h2>Dr. Richard James</h2>
                </div>

                <div className="row">
                  <p>General Physician</p>
                </div>

                <div className="row">
                  <p><strong>Address:</strong> 24 Main Street <br /> 10 Clause Road</p>
                </div>

                <div className="row">
                  <p><strong>Date & Time:</strong> 5 Oct 2024 | 12:00 PM</p>
                </div>
              </div>

              {/* Wrapper for the buttons */}
              <div className="buttons">
                <button className="pay-online">Pay Online</button>
                <button className="cancel-appointment">Cancel Appointment</button>
              </div>
          </div>

          <div className="appointment-card scroll-animation duration-2">
              <img src={doctor1} alt="Doctor" className="doctor-image" />

              <div className="appointment-details">
                <div className="row">
                  <h2>Dr. Richard James</h2>
                </div>

                <div className="row">
                  <p>General Physician</p>
                </div>

                <div className="row">
                  <p><strong>Address:</strong> 24 Main Street <br /> 10 Clause Road</p>
                </div>

                <div className="row">
                  <p><strong>Date & Time:</strong> 5 Oct 2024 | 12:00 PM</p>
                </div>
              </div>

              {/* Wrapper for the buttons */}
              <div className="buttons">
                <button className="pay-online">Pay Online</button>
                <button className="cancel-appointment">Cancel Appointment</button>
              </div>
          </div>

          <div className="appointment-card scroll-animation  duration-2">
              <img src={doctor1} alt="Doctor" className="doctor-image" />

              <div className="appointment-details">
                <div className="row">
                  <h2>Dr. Richard James</h2>
                </div>

                <div className="row">
                  <p>General Physician</p>
                </div>

                <div className="row">
                  <p><strong>Address:</strong> 24 Main Street <br /> 10 Clause Road</p>
                </div>

                <div className="row">
                  <p><strong>Date & Time:</strong> 5 Oct 2024 | 12:00 PM</p>
                </div>
              </div>

              {/* Wrapper for the buttons */}
              <div className="buttons">
                <button className="pay-online">Pay Online</button>
                <button className="cancel-appointment">Cancel Appointment</button>
              </div>
          </div>

          <div className="appointment-card scroll-animation  duration-2">
              <img src={doctor1} alt="Doctor" className="doctor-image" />

              <div className="appointment-details">
                <div className="row">
                  <h2>Dr. Richard James</h2>
                </div>

                <div className="row">
                  <p>General Physician</p>
                </div>

                <div className="row">
                  <p><strong>Address:</strong> 24 Main Street <br /> 10 Clause Road</p>
                </div>

                <div className="row">
                  <p><strong>Date & Time:</strong> 5 Oct 2024 | 12:00 PM</p>
                </div>
              </div>

              {/* Wrapper for the buttons */}
              <div>
                <button className="pay-online">Pay Online</button>
                <button className="cancel-appointment">Cancel Appointment</button>
              </div>
          </div>

        </div>
      </BodyContent>
      
    </>
  );
}

export default MyAppointmentPage;
