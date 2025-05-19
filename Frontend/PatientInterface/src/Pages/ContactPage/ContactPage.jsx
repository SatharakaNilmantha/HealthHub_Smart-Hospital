import React from 'react'
import HeaderContent from '../../Components/HeaderContent/HeaderContent'
import BodyContent from '../../Components/BoadyContent/BodyContent'
import ContactSection from '../../Components/ContactSection/ContactSection'
import FooterContent from '../../Components/FooterContent/FooterContent'

function ContactPage() {
  return (
    <>
     <HeaderContent/>
     <BodyContent>
        <div style={{marginTop:'180px'}}><ContactSection/></div>
     </BodyContent>
     <FooterContent/>
    </>
  )
}

export default ContactPage