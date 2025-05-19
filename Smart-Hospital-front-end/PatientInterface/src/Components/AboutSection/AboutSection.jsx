import React, { useEffect, useState ,useRef } from 'react';

import { LiaCheckDoubleSolid } from "react-icons/lia";
import {FaUserDoctor  } from "react-icons/fa6";
import { FaHospitalUser,FaAward } from "react-icons/fa";
import { ImLab } from "react-icons/im";

import { FaHandHoldingHeart } from "react-icons/fa6";
import { FaKitMedical } from "react-icons/fa6";
import { FaStaffSnake } from "react-icons/fa6";
import { FaLungs } from "react-icons/fa";




import Row from 'react-bootstrap/Row';
import AboutImg from '../../images/about/about.jpg'
import featurImg from '../../Images/about/features.jpg'
import './AboutSection.css'


function AboutSection() {

  // State to store the current progress and whether animation should run 
  const [progressValues, setProgressValues] = useState([0, 0, 0, 0]);  // Single array state for all progress values
  const [isAnimating, setIsAnimating] = useState(false);

  // Target values for each section
  const targetValues = [85, 15, 12, 160];

  // Reference for the component
  const progressDialRef = useRef(null); 

   
  // useEffect to handle the progress animation
  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
          setProgressValues((prevValues) => {
              // Check and update each progress value individually
              return prevValues.map((value, index) => {
                  if (value >= targetValues[index]) {
                      return targetValues[index]; // Stop at the target value for each section
                  }

                  // Corrected conditions for progress values between different ranges
                  if (targetValues[index] >= 100) {
                      return value + 11; // Increase progress by 5% for target values >= 100
                  } else if (targetValues[index] >= 50 && targetValues[index] < 100) {
                      return value + 5; // Increase progress by 5% for target values between 50 and 100
                  } else {
                      return value + 1; // Increase progress by 0.5% for target values < 50
                  }
              });
          });
      }, 30); // Update every 20ms


          // Cleanup interval when animation stops
          return () => clearInterval(interval);
      }
  }, [isAnimating, targetValues]);


   // Handle scroll event with IntersectionObserver to trigger animation
   useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            // If the component is in view, start the animation
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setProgressValues([0, 0, 0, 0]); // Reset progress; // Reset progress to 0
                    setIsAnimating(true); // Start animation
                } else {
                    setIsAnimating(false); // Stop animation if out of view
                }
            });
        },
        { threshold: 0.5 } // Trigger when 50% of the component is in view
    );

    if (progressDialRef.current) {
        observer.observe(progressDialRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
        if (progressDialRef.current) {
            observer.unobserve(progressDialRef.current);
        }
    };
    }, []);


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

    {/*--------------------------------------title section -------------------------------------------------*/ }
     <div className='scroll-animation duration-2'>
        <h1  className='text'>About Us</h1>
        <p style={{textAlign:'center',marginTop:'30px',color:"#333"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus aspernatur qui molestiae minus at soluta quaerat, officiis minima placeat nisi voluptatibus </p>
     </div>


      {/* -------------------------About us section1 --------------------------------------------------- */}
      <div className='cont1 '>
            <div className='aboutpart1 '>
          
            <p className='aboutimgs scroll-animation duration-1 ' ><img className='aboutimg' src={AboutImg} alt="" /></p>

            <div className='scroll-animation duration-3 ' >
              <h2 style={{ fontWeight:'800',color:'#444444'}}>Voluptatem dignissimos provident quasi corporis voluptates sit assumenda. </h2>
              <p style={{textAlign:'justify',color:'#444444',marginTop:"15px",marginBottom:"40px"}}> <em>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Beatae alias rem libero numquam dolorum magni natus possimus. Dolorem facilis nulla blanditiis qui,
                placeat deserunt quas maxime iusto quos dignissimos ex.</em></p>
                
                  <Row className='aboutpart2'>
                    <div className='icon2'><LiaCheckDoubleSolid /></div>
                    <div>
                      <p style={{textAlign:'justify',color:'#444444'}}>Ullamco laboris nisi ut aliquip ex ea commodo consequal  </p>
                    </div>
                  </Row>
                  <Row className='aboutpart2'>
                    <div className='icon2'><LiaCheckDoubleSolid /></div>
                    <div>
                      <p style={{textAlign:'justify',color:'#444444'}}>Duis aute irure dolor in reprehenderit in voluptate velit.   </p>
                    </div>
                  </Row>
                  <Row className='aboutpart2 b'>
                    <div className='icon2'><LiaCheckDoubleSolid /></div>
                    <div>  
                      <p style={{textAlign:'justify',color:'#444444'}}>Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in <br/>reprehenderit in voluptate trideta storacalaporda mastiro dolore eu fugiat nulla <br/> pariatur  </p>
                      </div>
                  </Row>

                  <p style={{textAlign:'justify',color:'#444444',marginTop:"10px"}}>Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident </p>
            </div>
          </div>
      </div>
      
      {/* -------------------------About us section2 --------------------------------------------------- */}
          
      <div className='cont2' ref={progressDialRef}>
            <div className='scroll-animation duration-2'>
                <div className="card">
                    <div className="card-icon ">
                        <FaUserDoctor />
                    </div>
                    <div className="card-content">
                        <h2 className="card-value">{progressValues[0]}</h2>
                        <p className="card-subtitle">Doctors</p>
                    </div>
                </div>
            </div>

            <div className='scroll-animation duration-1'>
                <div className="card">
                    <div className="card-icon blue">
                        <FaHospitalUser />
                    </div>
                    <div className="card-content">
                        <h2 className="card-value">{progressValues[1]}</h2>
                        <p className="card-subtitle">Departments</p>
                    </div>
                </div>
            </div>

            <div className='scroll-animation duration-1'>
                <div className="card">
                    <div className="card-icon ">
                        <ImLab />
                    </div>
                    <div className="card-content">
                        <h2 className="card-value">{progressValues[2]}</h2>
                        <p className="card-subtitle">Research Labs</p>
                    </div>
                </div>
            </div>

            <div className='scroll-animation duration-2'>
                <div className="card">
                    <div className="card-icon">
                        <FaAward />
                    </div>
                    <div className="card-content">
                        <h2 className="card-value">{progressValues[3]}</h2>
                        <p className="card-subtitle">Awards</p>
                    </div>
                </div>
            </div>
      </div>


      {/* -------------------------About us section3 --------------------------------------------------- */}
      <div className='cont3 '>
         <div className='aboutpart4 '>
          
            <p className='aboutimgs scroll-animation duration-1 ' ><img className='featurImg' src={featurImg} alt="" /></p>

            <div className='scroll-animation duration-3 ' >
              <h3 style={{color:'#2c4964', fontWeight:'800'}}>Enim quis est voluptatibus aliquid <br />consequatur fugiat </h3>
              <p style={{textAlign:'justify',color:'#444444',marginTop:"20px"}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Beatae alias rem libero numquam dolorum magni natus possimus. Dolorem facilis nulla blanditiis qui,
                placeat deserunt quas maxime iusto quos dignissimos ex. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Sunt incidunt possimus quibusdam, </p>

                  <Row className='aboutpart5'>
                    <div className='icon3'><FaHandHoldingHeart /></div>
                    <div>
                      <h4 style={{color:'#2c4964', fontWeight:'800'}}>Lorem Ipsum </h4>
                      <p style={{textAlign:'justify',color:'#444444'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure odio atque deserunt eos </p>
                    </div>
                  </Row>
                  <Row className='aboutpart5'>
                    <div className='icon3'><FaKitMedical /></div>
                    <div>
                    <h4 style={{color:'#2c4964', fontWeight:'800'}}>Nemo Enim  </h4>
                      <p style={{textAlign:'justify',color:'#444444'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure odio atque deserunt eos  </p>
                    </div>
                  </Row>
                  <Row className='aboutpart5'>
                    <div className='icon3'><FaStaffSnake /></div>
                    <div>  
                      <h4 style={{color:'#2c4964', fontWeight:'800'}}>Dine Pad  </h4> 
                      <p style={{textAlign:'justify',color:'#444444'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure odio atque deserunt eos  </p>
                      </div>
                  </Row> 
                  <Row className='aboutpart5 b'>
                    <div className='icon3'><FaLungs /></div>
                    <div>  
                      <h4 style={{color:'#2c4964', fontWeight:'800'}}>Tride clov  </h4> 
                      <p style={{textAlign:'justify',color:'#444444'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure odio atque deserunt eos  </p>
                      </div>
                  </Row> 

            </div>
          </div>
      </div>


    </>
  );

}

export default AboutSection