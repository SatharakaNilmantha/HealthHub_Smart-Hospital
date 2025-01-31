import React, { useEffect, useState ,useRef } from 'react';

import { LiaCheckDoubleSolid } from "react-icons/lia";



import Row from 'react-bootstrap/Row';
import AboutImg from '../../images/about/about.jpg'
import './AboutSection.css'


function AboutSection() {



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
     <div className='scroll-animation'>
        <h1  className='text-with-underline1'>About Us</h1>
        <p style={{textAlign:'center',marginTop:'30px'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus aspernatur qui molestiae minus at soluta quaerat, officiis minima placeat nisi voluptatibus </p>
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


    </>
  );

}

export default AboutSection