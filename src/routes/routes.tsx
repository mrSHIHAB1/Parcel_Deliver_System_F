import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "../Pages/Home";
import Main from "../Layout/Main";
import { Children } from "react";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

export const router = createBrowserRouter([
    {
      path: "/",
      element:<Main></Main> ,
      children:[
        {
            path:'/',
            element:<Home></Home>
        }
        ,
        {
          path:'/login',
            element:<Login></Login>
        },
        {
          path:'/register',
            element:<Register></Register>
        }
      ]
    },
  ]);