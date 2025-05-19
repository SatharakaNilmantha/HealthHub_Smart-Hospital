import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Login from './Pages/LoginPage/Login';
import Signup from './Pages/RegisterPage/Signup';
import Consultation from './Pages/Consultation/Consultation'; 
import Treatment from './Pages/Treatment/Treatment';
import PrescriptionPage from './Pages/PrescriptionPage/PrescriptionPage.jsx';
import AccountPage from './Pages/AccountPage/AccountPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,  // Wrap App around all child routes
  }, 

  {
    path: '/signup',
    element: <Signup />,  // Wrap App around all child routes
  }, 

  {
    path: '/dashboard',
    element: <App />,  // Wrap App around all child routes
  }, 
  { path: '/consultation',
    element: <Consultation /> 
  },
  { path: '/treatment', 
    element: <Treatment /> 
  },
  { path: '/prescription', 
    element: <PrescriptionPage /> 
  },
  { path: '/account', 
    element: <AccountPage /> 
  },
  
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
