import React from 'react'
import HeaderContent from '../../Components/HeaderContent/HeaderContent'
import BodyContent from '../../Components/BoadyContent/BodyContent'
import DoctorSection from '../../Components/DoctorSection/DoctorSection'
import FooterContent from '../../Components/FooterContent/FooterContent'

function DoctorPage() {
  return (
    <>
      <HeaderContent/>
      <BodyContent>
        <div style={{marginTop:'180px'}}><DoctorSection/></div>
      </BodyContent>
      <FooterContent/>
    </>
  )
}

export default DoctorPage