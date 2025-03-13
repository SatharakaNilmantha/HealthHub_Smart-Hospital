
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import VDoctors from './Pages/ViewDoctorsPage/ViewDoctors.jsx';
import DoctorsList from './Pages/DoctorsListPage/DoctorsListPage.jsx';

import './index.css'
import App from './App.jsx'
import Login from './Pages/LoginPage/Login'; // Import Login component
import Signup from './Pages/RegisterPage/Signup'; // Import Signup component

import ViewDoctors from './Pages/ViewDoctorsPage/ViewDoctors.jsx';
import EditDepartmentPage from './Pages/EditDepartmentPage/EditDepartmentPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />, // Default route to Login page
  },
  {
    path: '/login', // Route for the Login page
    element: <Login />,
  },
  {
    path: '/signup', // Route for the Signup page
    element: <Signup />,
  },
  {

    path: "/view-doctor-profile",
    element: <VDoctors/>,
  },
  {

    path: "/doctors",
    element: <DoctorsList/>,
  },
  {
    
    
    path: '/dashboard', // Route for the dashboard (App component)
    element: <App />,
  },


  {
    path: "/",
    element: <ViewDoctors/>,
  },
  {
    path: "/edit-department",
    element: <EditDepartmentPage/>,
  },
  


]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
