import React from 'react'
import './HeroSection.css'
import { FaChevronRight } from "react-icons/fa";

function HeroSection() {
  return (
    <>
      <div className='herosection'>
        <div className='heropart'>
        <h2 className='hTitle'>Welcome to HealthHub</h2>
        <h1 className='hTitle1'>We are here <br />for your Support</h1>
        <p className='hPara'>Far far away, behind the word mountains, far from the countriesof Vokalia and Consonantia,<br />
                             there live the blind texts. Separated by vast oceans and endless plains,they live in<br />
                             the hidden valley  of Bookmarksgrove, where stories are whispered by the winds.</p>
        
        <div style={{ marginBottom:"20px"}}><button  className='button1'>Learn More <FaChevronRight /></button></div>
        </div>
      </div>
    </>
  )
}

export default HeroSection