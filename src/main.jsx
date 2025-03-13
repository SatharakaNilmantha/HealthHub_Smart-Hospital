import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import './index.css'

import App from './App.jsx'

import ViewDoctors from './Pages/ViewDoctorsPage/ViewDoctors.jsx';
import EditDepartmentPage from './Pages/EditDepartmentPage/EditDepartmentPage.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <div><App/></div>,
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
  </StrictMode>,
)
