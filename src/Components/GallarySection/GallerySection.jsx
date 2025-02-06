import React, {  useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./GallerySection.css";

import img1 from "../../Images/gallery/gallery-1.jpg";
import img2 from "../../Images/gallery/gallery-2.jpg";
import img3 from "../../Images/gallery/gallery-3.jpg";
import img4 from "../../Images/gallery/gallery-4.jpg";
import img5 from "../../Images/gallery/gallery-5.jpg";
import img6 from "../../Images/gallery/gallery-6.jpg";

// Custom Previous Arrow using SVG
const PrevArrow = ({ onClick }) => {
  return (
    <button className="custom-arrow prev-arrow" onClick={onClick}>
      <svg width="30" height="30" viewBox="0 0 24 24" fill="#5B8689">
        <path d="M15 18l-6-6 6-6" stroke="#5B8689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
};

// Custom Next Arrow using SVG
const NextArrow = ({ onClick }) => {
  return (
    <button className="custom-arrow next-arrow" onClick={onClick}>
      <svg width="30" height="30" viewBox="0 0 24 24" fill="#5B8689">
        <path d="M9 18l6-6-6-6" stroke="#5B8689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
};



  

function GallerySection() {

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
  
    const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 700,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (

    <>


    <div className="slider-container">
    {/*--------------------------------------title section -------------------------------------------------*/}
      <div className="scroll-animation duration-2">
        <h1 className="text  ">Gallary</h1>
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
          aspernatur qui molestiae minus at soluta quaerat, officiis minima
          placeat nisi voluptatibus
        </p>
      </div>
      
      <div className="scroll-animation duration-2">
            <Slider {...settings}>
            {[img1, img2, img3, img4, img5, img6].map((image, index) => (
            <div className="slide-item" key={index}>
                <img src={image} alt={`Gallery ${index + 1}`} className="gallery-image" />
            </div>
            ))}
        </Slider>
      </div>
    </div>
    </>
  );
}

export default GallerySection;

