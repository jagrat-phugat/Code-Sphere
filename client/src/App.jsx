import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./App.css"
import { Navigate } from 'react-router-dom'
import Home from './pages/Home'
import NoPage from './pages/NoPage'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Editor from './pages/Editor'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ isLoggedIn ? <Home /> : <Navigate to='/login'/>} />
        <Route path='/signup' element={ <SignUp />} />
        <Route path='*' element={isLoggedIn ? <NoPage /> : <Navigate to='/login'/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/editor/:projectID' element={isLoggedIn ? <Editor /> : <Navigate to='/login' />} />
        <Route path='/about' element={isLoggedIn ? <About /> : <Navigate to='/login' />} />
        <Route path='/contact' element={isLoggedIn ? <Contact/> : <Navigate to='/login' />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App