import React from 'react'
import HeaderContent from '../../Components/HeaderContent/HeaderContent'
import BodyContent from '../../Components/BoadyContent/BodyContent'
import DepartmentSection from '../../Components/DepartmentSection/DepartmentSection'
import FooterContent from '../../Components/FooterContent/FooterContent'

function DepartmentPage() {
  return (
    <>
     <HeaderContent/>
     <BodyContent>
        <div style={{marginTop:'135px'}}><DepartmentSection/></div>
     </BodyContent>
     <FooterContent/>
    </>
  )
}

export default DepartmentPage