import React, { useEffect } from 'react';
import './FooterContent.css'

import { MdOutlineAttachEmail } from "react-icons/md";
import { MdHeadsetMic } from "react-icons/md";
import { BsTwitterX ,BsInstagram ,BsFacebook } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa6";

import logo1 from '../../images/logo/logo-removebg.png'

function FooterContent() {

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

    <footer style={{backgroundColor:'rgba(84, 129, 129, 0.13)',paddingBottom: '10px' }} className='scroll-animation'>
      <div  className="footer">
        <div className="footer-section">
        <div className="footer-logo">
            <img src={logo1} alt="BOOKMYDOCTOR Logo"className="logo"/>
        </div>
        <p className="footer-description">
            Tempora dolorem voluptatum nam vero assumenda voluptate, facilis ad eos obcaecati tenetur veritatis eveniet distinctio possimus.
        </p>
        <div className="footer-social-icons">
            <a href="#" className="social-icon1"><BsTwitterX/></a>
            <a href="#" className="social-icon1"><BsInstagram/></a>
            <a href="#" className="social-icon1"><BsFacebook/></a>
            <a href="#" className="social-icon1"><FaLinkedin/></a>
        </div>
        </div>
        <div className="footer-section">
        <h2 className="footer-title">Department</h2>
        <hr className="footer-line"/>
        <ul className="footer-list">
            <li>Cardiology</li>
            <li>Neurology</li>
            <li>Hepatology</li>
            <li>Pediatrics</li>
            <li>Medicine</li>
            <li>Eye Care</li>
        </ul>
        </div>
        <div className="footer-section">
        <h2 className="footer-title">Support</h2>
        <hr className="footer-line"/>
        <ul className="footer-list">
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Company Support</li>
            <li>FAQ Questions</li>
            <li>Company Licence</li>
            <li> Management</li>
        </ul>
        </div>
        <div className="footer-section">
        <h2 className="footer-title">Get In Touch</h2>
        <hr className="footer-line"/>
        <ul className="footer-list">
            <li><span><MdOutlineAttachEmail/></span><span className='ms-2'>Support Available for 24/7</span></li>
            <li><a href="mailto:Example@email.com">Example@email.com</a></li>
            <br />
            <li><span><MdHeadsetMic /></span><span className='ms-2'>Mon to Fri: 08:30 - 18:00</span></li>
            <li><a href="tel:+23456588">+23-456-6588</a></li>
        </ul>
        </div>
      </div> 
      
    </footer>
  )
}

export default FooterContent