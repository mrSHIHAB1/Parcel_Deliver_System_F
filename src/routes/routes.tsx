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
import CreateParcel from "../Pages/Dashboard/sender/CreateParcel";
import ViewParcels from "../Pages/Dashboard/sender/ViewParcels";
import AdminUsers from "../Pages/Dashboard/admin/Users";
import AdminParcels from "../Pages/Dashboard/admin/Parcels";
import ParcelDetails from "../Pages/Dashboard/admin/ParcelDetails";

import ViewIncoming from "../Pages/Dashboard/reciver/ViewIncoming";
import ReceiverParcelDetails from "../Pages/Dashboard/reciver/ReciverParcelDetails";
import DeliveryHistory from "../Pages/Dashboard/reciver/DeliveryHistory";
import SenderParcelDetails from "../Pages/Dashboard/sender/ParcelDetails";
import ParcelTrackingPage from "../Pages/Tracking/Tracking";

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
      { path: "/track", element: <ParcelTrackingPage/> },
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
          { path: "create", element: <CreateParcel/> },
          { path: "viewall", element: <ViewParcels/> },
          { path: "parcels/:id", element: <SenderParcelDetails/> },
          { path: "/sender/track", element: <ParcelTrackingPage/> },
          
        ],
      },
    ],
  },

  // Receiver routes
  {
    element: <ProtectedRoute allowedRoles={["RECIVER"]} />,
    children: [
    { path: "/receiver", element: <ReciverLayout />, children: [
    { index: true, element: <Navigate to="dashboard" replace /> },
    { path: "dashboard", element: <ReceiverDashboard /> },
    { path: "incoming", element: <ViewIncoming/> }, 
    { path: "parcels/:id", element: <ReceiverParcelDetails/>}, 
    { path: "delivery", element: <DeliveryHistory></DeliveryHistory>}, 
    { path: "/receiver/track", element: <ParcelTrackingPage/>}, 
]}

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
          { path: "users", element: <AdminUsers/>},
          { path: "parcels", element: <AdminParcels/> },
          { path: "parcels/:id", element: <ParcelDetails/> },
            { path: "/admin/track", element: <ParcelTrackingPage/>}, 
       
        ],
      },
    ],
  },
]);
