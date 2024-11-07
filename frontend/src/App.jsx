import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Home } from './Pages/home'
import { SignUp } from './Pages/SignUp'
import { Login } from './Pages/login'
import { useState, useEffect } from 'react'


function App() {
  const navigate = useNavigate();
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signUp' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </>
  )
}

export default App
