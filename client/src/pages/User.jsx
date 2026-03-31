import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import {
  Edit,
  Info,
  Plus,
  Settings,
  User2Icon,
  Loader2,
  Notebook,
} from "lucide-react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // Adjust path as needed

const User = () => {
  const { user, setUser, loading } = useContext(UserContext);

  const [isEditing, setIsEditing] = useState(false);
  const [formdata, setFormdata] = useState({
    name: user?.name || "",
    email: user?.email || "",
    profile: user?.profile || "",
  });

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
        <Loader2 className="animate-spin mb-4" size={48} />
        <p className="text-xl font-medium">Fetching profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
        <p className="text-xl font-medium mb-4">No user data found.</p>
        <Link
          to="/login"
          className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  const handleUserEdit = () => {
    if (isEditing) {
      setFormdata({ name: user.name, email: user.email });
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-200 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <div className="flex-1 flex flex-col md:flex-row gap-6 p-8 w-full max-w-7xl mx-auto overflow-hidden">
        <div className="w-full md:w-1/3 h-[400px] md:h-full bg-slate-300 rounded-[2.5rem] flex flex-col items-center justify-center relative shadow-xl border-4 border-yellow-100">
          <Edit
            onClick={handleUserEdit}
            size={24}
            className="absolute top-6 right-6 text-white cursor-pointer hover:scale-110 transition-transform"
          />
          <div className="bg-white/20 p-6 rounded-full mb-4 border-4 border-white">
            <User2Icon size={80} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold">{user.name}</h2>
          <p className="text-red-100 italic">{user.email}</p>
        </div>

        <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
          <Link
            to="/user/note"
            className="bg-slate-600 rounded-[2rem] flex flex-col items-center justify-center hover:scale-105 transition-all shadow-lg group"
          >
            <Plus
              size={60}
              className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"
            />
            <span className="text-white font-semibold mt-2">New Note</span>
          </Link>

          <Link
            to="/user/aboutUs"
            className="bg-slate-400 rounded-[2rem] flex flex-col items-center justify-center hover:scale-105 transition-all shadow-lg group"
          >
            <Info
              size={60}
              className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"
            />
            <span className="text-white font-semibold mt-2">About Us</span>
          </Link>

          <Link
            to="/user/settings"
            className="bg-slate-400 rounded-[2rem] flex flex-col items-center justify-center hover:scale-105 transition-all shadow-lg group"
          >
            <Settings
              size={60}
              className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"
            />
            <span className="text-white font-semibold mt-2">Settings</span>
          </Link>

          <Link
            to="/user/all-notes"
            className="bg-slate-400 rounded-[2rem] flex flex-col items-center justify-center hover:scale-105 transition-all shadow-lg group"
          >
            <Notebook
              size={60}
              className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"
            />
            <span className="text-white font-semibold mt-2">All Notes</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default User;
