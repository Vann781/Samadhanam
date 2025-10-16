import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/login'
import Home from './components/home'
import All_district from './components/all_district'
import { Outlet } from 'react-router-dom'

function App() {
  

  return (
    <div>
      <Outlet></Outlet>
    </div>
  )
}

export default App
