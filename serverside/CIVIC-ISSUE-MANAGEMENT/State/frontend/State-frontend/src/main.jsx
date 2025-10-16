import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/login.jsx'
import Home from './components/home.jsx'
import All_district from './components/all_district.jsx'
import React from 'react'
const router = createBrowserRouter([
  {
     path:"/",
     element:<Login></Login>
  },

  {
    path:'/',
    element:<App></App>,
    children:[
      {
         path: "Home/:id",
         element: <Home></Home>
      },
      {
        path:"AllDistricts",
        element: <All_district></All_district>
      },
      
      
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      
      <RouterProvider router={router} />
      
  </React.StrictMode>,
)
