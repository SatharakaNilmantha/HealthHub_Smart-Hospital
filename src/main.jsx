
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import DoctorList from './Pages/DoctorsListPage/DoctorsListPage.jsx';
import ViewDoctors from './Pages/ViewDoctorPage/ViewDoctorPage.jsx';


const router = createBrowserRouter([

  {
    path: '/', // Route for the dashboard (App component)
    element: <App />,
  },
  {
    path: '/doctors', 
    element: <DoctorList />,
  },
  {
    path: '/view-doctor-profile/:doctorName', // Dynamic segment for doctor's name
    element: <ViewDoctors />,
  },


]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
