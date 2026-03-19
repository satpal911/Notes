import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Landing from '../pages/Landing'
import About from '../pages/About'

const PublicRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>

        <Route path='/' element={<Landing/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
    </div>
  )
}

export default PublicRoutes
