import React from 'react'
import HeaderContent from '../../Components/HeaderContent/HeaderContent'
import BodyContent from '../../Components/BoadyContent/BodyContent'
import FooterContent from '../../Components/FooterContent/FooterContent'
import ServiceSection from '../../Components/ServiceSection/ServiceSection'

function ServicePage() {
  return (
    <>
      <HeaderContent/>
      <BodyContent>
        <div style={{marginTop:'170px'}}><ServiceSection/></div>
      </BodyContent>
      <FooterContent/>
      
    </>
  )
}

export default ServicePage