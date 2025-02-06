import React , {useEffect} from 'react'

import './AboveDepartmentSection.css'

function AboveDepartmentSection() {

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
      <div className='abovedsection '>
         
          <h1 className='scroll-animation duration-2'>Your Health is Our Priority</h1>
          <p className='scroll-animation duration-2'>We can manage your dream building A small river named Duden flows by their place </p>
          
          <div style={{textAlign:"center",marginTop:'50px'}}> <a href="#" className="Sbutton scroll-animation duration-2">Search Places</a></div>
      </div>
    </>
  )
}

export default AboveDepartmentSection