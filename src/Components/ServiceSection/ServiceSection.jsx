import React, { useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { FaStethoscope, FaHeartbeat, FaXRay, FaUserMd, FaCapsules, FaAmbulance } from "react-icons/fa";
import "./ServiceSection.css";


function ServiceSection() {
    const servicesData = [
        { icon: <FaStethoscope />, title: "General Consultation", info: "Expert medical advice" },
        { icon: <FaHeartbeat />, title: "Cardiology", info: "Heart health specialists" },
        { icon: <FaXRay />, title: "Radiology & Imaging", info: "Advanced diagnostic scans" },
        { icon: <FaUserMd />, title: "Specialist Appointments", info: "Consult top specialists" },
        { icon: <FaCapsules />, title: "Pharmacy Services", info: "Get prescribed medications" },
        { icon: <FaAmbulance />, title: "Emergency Services", info: "24/7 emergency care" },
      ];


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
    <Container className="services-container">
    <section id="services">
      <div className="services-top text-center scroll-animation duration-2">
        <h2>What We Offer</h2>
        <h2 className="services-title">Our Services</h2>
        <p style={{color:"#212529"}}>
          Our <span className="highlight">experienced</span> and{" "}
          <span className="highlight">dedicated</span> staff provide these services with a smile.
        </p>
      </div>

      <Row className="services-list">
        {servicesData.map((service, index) => (
          <Col key={index} md={4} sm={6} className="service-block scroll-animation duration-2">
            <div className="icon">{service.icon}</div>
            <div className="text-block">
              <div className="name">{service.title}</div>
              <div className="info">{service.info}</div>
              <div className="text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames.
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </section>
  </Container>
  )
}

export default ServiceSection







