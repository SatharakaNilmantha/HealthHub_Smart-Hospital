import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'




import LoginPage from './Pages/LoginPage/LoginPage.jsx';
import RegisterPage from './Pages/RegisterPage/RegisterPage.jsx';
import MyProfile from './Pages/MyProfilePage/MyProfilePage.jsx';
import MyAppointment from './Pages/MyAppointmentPage/MyAppointmentPage.jsx'


import CAppointment from './Pages/DoctorAppointmentPage/ConsultationAppointmentPage.jsx';
import TAppointment from './Pages/DoctorAppointmentPage/TreatmentAppoitmentPage.jsx';

import AboutPage from './Pages/AboutPage/AboutPage.jsx';
import ServicePage from './Pages/ServicePage/ServicePage.jsx';
import DepartmentPage from './Pages/DepartmentPage/DepartmentPage.jsx';

import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import DoctorPage from './Pages/DoctorPage/DoctorPage.jsx';
import ContactPage from './Pages/ContactPage/ContactPage.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  
  {
    path: "/register",
    element: <RegisterPage/>,
  },

  {
    path: "/myProfile",
    element: <MyProfile/>,
  },

  {
    path: "/myAppointment",
    element: <MyAppointment/>,
  },

  {
    path: "/consultation-appointment",
    element: <CAppointment/>,
  },
 
  {
    path: "/treatment-appointment",
    element: <TAppointment/>,
  },


  {
    path: "/about",
    element: <AboutPage/>,
  },
  {
    path: "/service",
    element: <ServicePage/>,
  },
  {
    path: "/department",
    element: <DepartmentPage/>,
  },
  {
    path: "/doctors",
    element: <DoctorPage/>,
  },
  {
    path: "/contact",
    element: <ContactPage/>,
  }
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
