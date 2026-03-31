import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Landing from '../pages/Landing'
import About from '../pages/About'
import User from '../pages/User'
import Settings from '../pages/Settings'
import Note from '../components/Note'
import AllNotes from '../pages/AllNotes'
const PublicRoutes = () => {
  return (
    <div>
      <Routes>
        //Authentication routes
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>

        //Public routes
        <Route path='/' element={<Landing/>}/>
        <Route path='/about' element={<About/>}/>

        //protected routes
        <Route path='/user/me' element={<User/>}/>
        <Route path='/user/settings' element={<Settings/>}/>
        <Route path='/user/note' element={<Note/>}/>
        <Route path='/user/all-notes' element={<AllNotes/>}/>
        
      </Routes>
    </div>
  )
}

export default PublicRoutes
