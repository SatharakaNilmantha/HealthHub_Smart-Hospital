import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Login from './Pages/LoginPage/Login';
import Signup from './Pages/RegisterPage/Signup';
import Consultation from './Pages/Consultation/Consultation'; 
import Treatment from './Pages/Treatment/Treatment';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,  // Wrap App around all child routes
  },  
  { path: '/consultation',
    element: <Consultation /> 
  },
  { path: '/treatment', 
    element: <Treatment /> 
  },
  
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
