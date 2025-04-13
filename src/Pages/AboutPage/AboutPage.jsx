import React from 'react'
import HeaderContent from '../../Components/HeaderContent/HeaderContent'
import AboutSection  from '../../Components/AboutSection/AboutSection'

import BodyContent from '../../Components/BoadyContent/BodyContent'
import FooterContent from '../../Components/FooterContent/FooterContent'

function AboutPage() {
  return (
    <>
     <HeaderContent/>
     <BodyContent>
       <div style={{marginTop:'175px'}}><AboutSection/></div>
       
       </BodyContent>
     <FooterContent/>
    </>
  )
}

export default AboutPage