import React from 'react'
import Navbar from '../components/Navbar'
import {MoveRight} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate()
  const handleExploreMore = () =>{
    navigate("/about")
  }

  const handleGetStarted = () =>{
    navigate("/register")
  }

  return (
    <div className='min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300'>
        <Navbar/>
      <h1 className='text-5xl font-bold text-center mt-20 text-blue-200'>Do not need to remember things just create notes</h1>
      <div className='flex justify-center'>
        <button onClick={handleExploreMore} className='border border-red-200 bg-yellow-300 p-4 w-full m-5 rounded-lg cursor-pointer hover:bg-yellow-400 text-2xl font-bold text-blue-500'>Explore more ...</button>
         <button onClick={handleGetStarted} className=' flex justify-center gap-2 border border-red-200 bg-green-300 p-4 w-full m-5 rounded-lg cursor-pointer hover:bg-green-400 text-blue-500 font-bold text-2xl'>Get Started<MoveRight size={28} strokeWidth={3}/></button>
        </div>
        <div className='flex justify-around mt-10 gap-2 px-2 scroll-left translate-x'>
          <div className='border-blue-100 rounded-lg h-50 w-100 bg-blue-100 '></div>
          <div className='border-blue-100 rounded-lg h-50 w-100 bg-blue-100 '></div>
          <div className='border-blue-100 rounded-lg h-50 w-100 bg-blue-100 '></div>
          <div className='border-blue-100 rounded-lg h-50 w-100 bg-blue-100 '></div>
        </div>
        <p className='bg-black text-white text-center mt-10'>All rights reserved @Notes2026</p>
    </div>
  )
}

export default Landing
