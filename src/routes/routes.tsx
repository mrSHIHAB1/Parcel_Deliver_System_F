import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "../Pages/Home";
import Main from "../Layout/Main";

import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ProtectedRoute from "../features/auth/ProtectedRoute";
import { SenderDashboard } from "../Pages/SenderDashboard";
import { AdminDashboard } from "../Pages/AdminDashboard";
import Unauthorized from "../Pages/Unauthorized";
import { ReciverDashboard } from "../Pages/ReciverDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      }
      ,
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        element: <ProtectedRoute allowedRoles={["SENDER"]} />,
        children: [
          {
            path: "/sender-dashboard",
            element: <SenderDashboard />
          }
        ],
      },
      {
        element: <ProtectedRoute allowedRoles={["RECEIVER"]} />,
        children: [{ path: "/receiver-dashboard", element: <ReciverDashboard /> }],
      },
      {
        element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
        children: [{ path: "/admin-dashboard", element: <AdminDashboard /> }],
      },

      {
        path: "/unauthorized", element: <Unauthorized></Unauthorized>
      },
    ]
  }
]);