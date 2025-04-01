

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Loging from './Pages/LoginPage/Login.jsx';
import Signup from'./Pages/RegisterPage/Signup.jsx';
import App from './App.jsx';
import DoctorList from './Pages/DoctorsListPage/DoctorsListPage.jsx';
import PrescriptionPage from './Pages/PrescriptionPage/PrescriptionPage.jsx';
import PrescriptionListPage from './Pages/PrescriptionListPage/PrescriptionListPage.jsx';
import ViewDoctorsPage from './Pages/ViewDoctorsPage/ViewDoctorsPage.jsx';
import AccountPage from './Pages/AccountPage/AccountPage.jsx';


const router = createBrowserRouter([

  {
    path: '/', 
    element: <Loging/>,
  },
  {
    path: '/signup', 
    element: <Signup/>,
  },
  {
    path: '/dashboard', 
    element: <App/>,
  },
  {
    path: '/doctors', 
    element: <DoctorList />,
  },
  {
    path: '/prescription/:prescriptionId', 
    element: <PrescriptionPage />,
  },
  {
    path: 'prescriptionlist', 
    element: <PrescriptionListPage />,
  },
  {
    path: 'view-doctor-profile/:doctorId', 
    element: <ViewDoctorsPage />,
  },
  {
    path: '/account', 
    element: <AccountPage />,
  },


]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
