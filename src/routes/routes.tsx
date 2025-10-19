import { createBrowserRouter, Navigate } from "react-router-dom";


import Main from "../Layout/Main";

import Home from "../Pages/public/Home";
import Register from "../Pages/auth/Register";
import Login from "../Pages/auth/Login";
import Unauthorized from "../Pages/Unauthorized";




import ProtectedRoute from "../ProtectedRoutes/ProtectedRoute";
import SenderLayout from "../Pages/Dashboard/sender/SenderLayout";
import { SenderDashboard } from "../Pages/Dashboard/sender/SenderDashboard";
import ReciverLayout from "../Pages/Dashboard/reciver/ReciverLayout";
import { ReceiverDashboard } from "../Pages/Dashboard/reciver/ReciverDashboard";
import AdminLayout from "../Pages/Dashboard/admin/AdminLayout";
import { AdminDashboard } from "../Pages/Dashboard/admin/AdminDashboard";

export const router = createBrowserRouter([
  // Public routes
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/unauthorized", element: <Unauthorized /> },
    ],
  },

  // Sender routes
  {
    element: <ProtectedRoute allowedRoles={["SENDER"]} />,
    children: [
      {
        path: "/sender",
        element: <SenderLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <SenderDashboard /> },

        ],
      },
    ],
  },

  // Receiver routes
  {
    element: <ProtectedRoute allowedRoles={["RECEIVER"]} />,
    children: [
      {
        path: "/receiver",
        element: <ReciverLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <ReceiverDashboard /> },
       
        ],
      },
    ],
  },

  // Admin routes
  {
    element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <AdminDashboard /> },
       
        ],
      },
    ],
  },
]);
