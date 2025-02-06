import './App.css'



import HeaderContent from './Components/HeaderContent/HeaderContent.jsx'
import BodyContent from './Components/BoadyContent/BodyContent.jsx'
import DoctorSection from './Components/DoctorSection/DoctorSection.jsx'
import DepartmentSection from './Components/DepartmentSection/DepartmentSection.jsx'
import ServiceSection from './Components/ServiceSection/ServiceSection.jsx'
import HeroSection from './Components/HeroSection/HeroSection.jsx'
import AboutSection from './Components/AboutSection/AboutSection.jsx'
import FeedbackSection from './Components/FeedbackSection/FeedbackSection.jsx' 
import GallerySection from './Components/GallarySection/GallerySection.jsx'
import ContactSection from './Components/ContactSection/ContactSection'
import FooterContent from './Components/FooterContent/FooterContent.jsx'
import AboveDepartmentSection from './Components/AboveDepartmentSection/AboveDepartmentSection.jsx'





function App() {


  return (
    <>
    
     <HeaderContent/>
     <BodyContent>
       <div style={{marginTop:'135px'}}><HeroSection/></div>
       <div style={{marginTop:'80px'}}><AboutSection/></div>
       <div style={{marginTop:'55px'}}><ServiceSection/></div>
       <AboveDepartmentSection/>
       <div style={{marginTop:'100px'}}><DepartmentSection/></div>
       <div style={{marginTop:'80px'}}><DoctorSection/></div>
       <div style={{marginTop:'80px'}}><FeedbackSection/></div>
       <div style={{marginTop:'80px'}}><GallerySection/></div>
       <div style={{marginTop:'50px'}}><ContactSection/></div>
      </BodyContent>
     <FooterContent/>
    
     
     

    </>

  )
}

export default App
