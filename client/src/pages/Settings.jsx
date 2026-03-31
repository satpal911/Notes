import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import { LogOut } from 'lucide-react'
import { UserContext } from '../context/UserContext' // Adjust path to your context file

const Settings = () => {
  // 1. Get the logout function from your context
  const { logout } = useContext(UserContext);

  const handleLogout = () => {
    // 2. Call the function from context (this handles state and navigation)
    logout();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Settings</h1>

        <div className="flex justify-start">
          <button 
            onClick={handleLogout} 
            className='bg-red-500 hover:bg-red-600 active:scale-95 transition-all p-3 px-8 rounded-[2rem] font-bold text-white cursor-pointer flex items-center gap-2 shadow-lg'
          >
            Logout <LogOut size={20}/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings;
