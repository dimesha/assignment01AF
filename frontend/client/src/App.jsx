import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AdminDashboard from './pages/AdminDashboard'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './pages/Header'

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/dashboard" element={<AdminDashboard />}/>
        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/sign-up" element={<SignUp />}/>
      </Routes>
    </BrowserRouter>
  )
}
