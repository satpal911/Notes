import React from 'react'
import PublicRoutes from './routes/PublicRoutes'
import { Routes, Route } from 'react-router-dom'
import {Toaster} from "react-hot-toast"
const App = () => {
  return (
    <div>
      <Routes>
      <Route path="/*" element={<PublicRoutes />} />
      </Routes>
      <Toaster position='top-center'/>
    </div>
  )
}

export default App
