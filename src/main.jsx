import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import VDoctors from './Pages/ViewDoctorsPage/ViewDoctors.jsx';
import DoctorsList from './Pages/DoctorsListPage/DoctorsListPage.jsx';

import './index.css'
import App from './App.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <div><App/></div>,
  },
  {
    path: "/view-doctor-profile",
    element: <VDoctors/>,
  },
  {
    path: "/doctors",
    element: <DoctorsList/>,
  },
  

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
