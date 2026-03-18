import React, { useContext } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import {UserContext} from '../context/UserContext'
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const {login, loading} = useContext(UserContext)
  const handleChange = (e) =>{
    const{name,value} = e.target
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  const handleSubmit = async(e) =>{
    e.preventDefault()
   try {
    await login(formData.email, formData.password)
     toast.success("User loggedIn successfully")
    setFormData({email:"",password:""})
   } catch (error) {
    toast.error(error || "Something went wrong")
   }
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen '>
      <h1 className='text-center text-2xl font-bold mb-4'>Login here</h1>
     <form onSubmit={handleSubmit}
     className='border-4 border-gray-200 flex flex-col w-96 p-8 rounded-lg items-center justify-around gap-4 shadow-lg'>
       <input type="email"
      placeholder='Enter your email'
      name='email'
      value={formData.email}
      onChange={handleChange}
      required
      className='w-full p-2 border rounded' />

      <input type="password"
      placeholder='Enter your password'
      name='password'
      value={formData.password}
      onChange={handleChange}
      required
      className='w-full p-2 border rounded' />

      <button type='submit' disabled={loading}
      className='w-full p-2 cursor-pointer bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition'>{loading ? "Logging in..." : "Login"}</button>
      
     </form>
     <p className=''>don't have an account</p>
      <p className=''>register</p>
    </div>
  )
}

export default Login
