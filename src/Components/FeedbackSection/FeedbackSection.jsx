
import React from 'react'
import './FeedbackSection.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Card from 'react-bootstrap/Card';
import { CardTitle } from 'react-bootstrap';

import person_1 from '../../Images/Feedback/person_1.jpg'
import person_2 from '../../Images/Feedback/person_2.jpg'
import person_3 from '../../Images/Feedback/person_3.jpg'
import person_4 from '../../Images/Feedback/person_4.jpg'

import { FaStar } from "react-icons/fa6";
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";


function FeedbackSection() {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1, // Display only one slide at a time
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
      };

    const Comments = [
             {
               eventKey: 1,
               Name: "Walter White",
               title: "Chief Medical Officer",
               description: "Qui laudantium consequatur dio similique illum id quidem non enim fug. laborum sit qui ad sapiente dila parde ,for Eye Care goes here  Odim non efor Eye Care goes here  Odio similique illum id quidem non e",
               imgSrc:person_1
             },
             {
               eventKey: 2,
               Name:"Sarah Jhonson",
               title: "Cardialogy",
               description: "Eos voluptatibus quo.dio similique illum id quidem non enim fugOdio similique illum id quidem non enim fuga. for Eye Care goes here  Odio similique ill for Eye Care goes here  Odio similique illum id quidem non e",
               imgSrc: person_2
             },
             {
               eventKey: 3,
               Name:"William Anderson",
               title :"Neurology" ,
               description: "Eos voluptatibus quo. Odio similique illum id quidem non enim fuga. Qui natus non sunt.dio similique illum id quidem non enim for Eye Care goes here  Odio similique illum id quidem non e fug",
               imgSrc: person_3
             },
             {
               eventKey: 4,
               Name:"Amanda Jepson",
               title: "Pediatrics",
               description: "Description for Pediatrics goes here  Odio similique illum id quidem non enim fuga.dio similique illum id quidem non enim fug for Eye Care goes here  Odio similique illum id quidem non e",
               imgSrc: person_4
             },
           
     
      ];
  return (
    <>
     <div className='Testimonialsection'>
        <div style={{ textAlign:"justify" ,paddingRight:"20px" }}>
           <h2 style={{ color: "#2c4964",fontWeight: 800 }}>Testimonials</h2>
           <p style={{   fontSize: "18px", color: "#444444",marginTop:"10px"}}>Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
        </div>

        <div className="slidesection ">
        <Slider {...settings}>

            {Comments.map( Comment =>(
            <div key={Comment.Name}>
            <Card className="slidecard"  style={{ border: "none" }}  >
                    
                    <div className="cardtitle">
                        <img src={Comment.imgSrc} className="pimg" />
                        <div className="pname">
                        <CardTitle style={{ margin: "0px" ,padding:"0px",color: "#2c4964",fontWeight: 600 }}>{Comment.Name}</CardTitle>
                        <p style={{ margin: "0px" ,padding:"0px",color: "#444444"}}>{Comment.title}</p>
                        <p style={{ margin: "0px" ,padding:"0px",color: "#ffc107"}}><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></p>
                        </div>
                    </div>
                    
                    <Card.Body>
                        <p style={{  fontSize: "18px" ,color: "#444444" ,textAlign:"justify" }}> <em> <span style={{fontSize: "25px",color: "#0283e658"}}><RiDoubleQuotesL /></span> {Comment.description} <span style={{ fontSize: "25px" ,color: "#0283e658"}}><RiDoubleQuotesR /></span> </em></p>
                    </Card.Body>
            </Card>
            </div>
            ))}
        </Slider>
        </div>
    </div>

    </>
  )
}

export default FeedbackSection