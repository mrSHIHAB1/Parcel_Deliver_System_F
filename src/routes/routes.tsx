import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "../Pages/Home";
import Main from "../Layout/Main";
import { Children } from "react";

export const router = createBrowserRouter([
    {
      path: "/",
      element:<Main></Main> ,
      children:[
        {
            path:'/',
            element:<Home></Home>
        }
      ]
    },
  ]);