import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DoctorsList from './Pages/DoctorsListPage/DoctorsListPage.jsx';
import AddDoctor from './Pages/AddDoctorsPage/AddDoctors.jsx'
import DoctorProfile from './Pages/ViewDoctorsPage/ViewDoctors.jsx'

import './index.css';
import App from './App.jsx';
import Login from './Pages/LoginPage/Login';
import Signup from './Pages/RegisterPage/Signup';

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/dashboard", element: <App /> },
  { path: "/doctors", element: <DoctorsList /> },
  { path: "/adddoctor", element: <AddDoctor /> },
  { path: "/view-doctor-profile/:id", element: <DoctorProfile /> }, // Correct route with :id
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
