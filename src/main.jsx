
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx'
import Login from './Pages/LoginPage/Login'; // Import Login component
import Signup from './Pages/RegisterPage/Signup'; // Import Signup component




const router = createBrowserRouter([

  {
    path: '/', // Route for the dashboard (App component)
    element: <App />,
  },


]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
