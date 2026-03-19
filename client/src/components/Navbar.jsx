import React, { useState, useEffect } from 'react' // 1. Added useEffect
import { Moon, Sun } from 'lucide-react'

const Navbar = () => {
  // Initialize from localStorage so it stays dark if the user refreshes
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // 2. This logic talks to the browser
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove('dark');
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    /* 3. Add dark:bg and dark:border here so the Navbar itself changes */
    <nav className='w-full h-16 flex justify-between items-center px-8 border-b border-gray-200 bg-white dark:bg-slate-900 dark:border-slate-800 shadow-sm transition-colors duration-300'>
      <span className='text-2xl font-extrabold tracking-tight text-slate-800 dark:text-white italic'>
        Notes<span className='text-blue-600'>.</span>
      </span>
      
      <button 
        onClick={() => setIsDark(!isDark)}
        /* Added dark:bg-slate-800 dark:border-slate-700 */
        className='relative flex items-center bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full p-1 cursor-pointer w-16 h-9 transition-all duration-300 hover:border-slate-300 active:scale-95'
      >
        <div className={`absolute w-7 h-7 bg-white dark:bg-slate-300 rounded-full border border-slate-200 shadow-sm transition-all duration-500 ease-in-out z-10 flex items-center justify-center ${isDark ? 'translate-x-7' : 'translate-x-0'}`}>
           {isDark ? <Moon size={14} className="text-blue-500 fill-blue-500" /> : <Sun size={14} className="text-amber-500 fill-amber-500" />}
        </div>
        <div className='flex justify-between w-full px-1.5'>
          <Sun size={16} className={`${!isDark ? 'opacity-0' : 'text-slate-400'} transition-opacity duration-300`} />
          <Moon size={16} className={`${isDark ? 'opacity-0' : 'text-slate-400'} transition-opacity duration-300`} />
        </div>
      </button>
    </nav>
  )
}

export default Navbar
