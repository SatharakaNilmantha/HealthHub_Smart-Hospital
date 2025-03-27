
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Login from "./Pages/LoginPage/Login";
import Signup from "./Pages/RegisterPage/Signup";
import DoctorsList from "./Pages/DoctorsListPage/DoctorsListPage.jsx";
import AddDoctor from "./Pages/AddDoctorsPage/AddDoctors.jsx";
import DoctorProfile from "./Pages/ViewDoctorsPage/ViewDoctorsPage.jsx";
import EmployeeListPage from "./Pages/EmployeeListPage/EmployeeListPage.jsx";
import AddEmployeePage from "./Pages/AddEmployeePage/AddEmployeePage.jsx";
import AddDepartmentPage from "./Pages/AddDepartmentPage/AddDepartmentPage.jsx";
import DepartmentListPage from "./Pages/DepartmentListPage/DepartmentListPage.jsx";
import ViewDepartmentPage from "./Pages/ViewDepartmentPage/ViewDepartmentPage.jsx";
import EditEmployeePage from "./Pages/EditEmployeePage/EditEmployeePage.jsx";

import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/dashboard", element: <App /> },
  { path: "/doctors", element: <DoctorsList /> },
  { path: "/adddoctor", element: <AddDoctor /> },
  { path: "/view-doctor-profile/:doctorId", element: <DoctorProfile /> }, // Dynamic ID
  { path: "/employees", element: <EmployeeListPage /> },
  { path: "/addemployee", element: <AddEmployeePage /> },
  { path: "/addDepartment", element: <AddDepartmentPage /> },
  { path: "/DepartmentList", element: <DepartmentListPage /> },
  { path: "/view-department/:departmentId", element: <ViewDepartmentPage /> }, // Optional Dynamic ID for departments
  { path: "/edit-employee/:employeeId", element: <EditEmployeePage /> }, // Add route
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
