import React, { useContext, useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import {
  Edit,
  Info,
  Plus,
  Settings,
  User2Icon,
  Loader2,
  Notebook,
  Check,
  X,
  Camera,
} from "lucide-react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const User = () => {
  const { user, setUser, loading } = useContext(UserContext);
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [formdata, setFormdata] = useState({ name: "" });

  useEffect(() => {
    if (user) setFormdata({ name: user?.name || "" });
  }, [user]);

  const handleSaveName = async () => {
    try {
      setUpdating(true);
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:4000/api/v1/user/updateName",
        { name: formdata.name },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setUser((prev) => ({ ...prev, name: formdata.name }));
      setIsEditing(false);
      alert("Name updated!");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("profile", file);

    try {
      setUpdating(true);
      const token = localStorage.getItem("token");

      const { data } = await axios.put(
        "http://localhost:4000/api/v1/user/updatePic",
        uploadData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const newPic = data?.user?.profile || data?.profile;
      setUser((prev) => ({ ...prev, profile: newPic }));
      alert("Profile picture updated!");
    } catch (err) {
      alert("Image upload failed", err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
        <p className="text-slate-500 animate-pulse">Loading Profile...</p>
      </div>
    );

  if (!user)
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950">
        <p className="text-xl font-medium mb-4">No user data found.</p>
        <Link
          to="/login"
          className="px-6 py-2 bg-red-500 text-white rounded-full"
        >
          Go to Login
        </Link>
      </div>
    );

  return (
    <div className="flex flex-col h-screen bg-slate-200 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <div className="flex-1 flex flex-col md:flex-row gap-6 p-8 w-full max-w-7xl mx-auto overflow-hidden">
        <div className="w-full md:w-1/3 h-full bg-slate-300 dark:bg-slate-900 rounded-[2.5rem] flex flex-col items-center justify-center relative shadow-xl border-4 border-yellow-100">
          <div className="absolute top-6 right-6 flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveName}
                  disabled={updating}
                  className="p-2 bg-green-500 rounded-full text-white hover:bg-green-600 transition-all cursor-pointer shadow-md"
                >
                  {updating ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <Check size={20} />
                  )}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-all cursor-pointer shadow-md"
                >
                  <X size={20} />
                </button>
              </>
            ) : (
              <Edit
                onClick={() => setIsEditing(true)}
                size={24}
                className="text-white cursor-pointer hover:scale-110 transition-transform"
              />
            )}
          </div>

          <div
            className="relative group cursor-pointer mb-4"
            onClick={() => !updating && fileInputRef.current.click()}
          >
            <div className="bg-white/20 p-1 rounded-full border-4 border-white overflow-hidden w-32 h-32 flex items-center justify-center shadow-lg">
              {user?.profile ? (
                <img
                  src={user?.profile}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User2Icon size={60} className="text-white" />
              )}
            </div>

            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {updating ? (
                <Loader2 className="animate-spin text-white" />
              ) : (
                <Camera className="text-white" size={24} />
              )}
            </div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleProfilePicChange}
            className="hidden"
            accept="image/*"
          />

          {isEditing ? (
            <div className="w-3/4 animate-in fade-in zoom-in duration-200">
              <input
                name="name"
                value={formdata.name}
                onChange={(e) => setFormdata({ name: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none border-2 border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all"
                placeholder="New Name"
              />
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
                {user?.name}
              </h2>
              <p className="text-red-600 dark:text-slate-400 font-medium italic">
                {user?.email}
              </p>
            </div>
          )}
        </div>

        <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
          <Link
            to="/user/note"
            className="bg-slate-600 rounded-[2rem] flex flex-col items-center justify-center hover:scale-105 hover:bg-slate-500 transition-all shadow-lg group"
          >
            <Plus
              size={60}
              className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"
            />
            <span className="text-white font-semibold mt-2">New Note</span>
          </Link>

          <Link
            to="/user/aboutUs"
            className="bg-slate-400 rounded-[2rem] flex flex-col items-center justify-center hover:scale-105 hover:bg-slate-500 transition-all shadow-lg group"
          >
            <Info
              size={60}
              className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"
            />
            <span className="text-white font-semibold mt-2">About Us</span>
          </Link>

          <Link
            to="/user/settings"
            className="bg-slate-400 rounded-[2rem] flex flex-col items-center justify-center hover:scale-105 hover:bg-slate-500 transition-all shadow-lg group"
          >
            <Settings
              size={60}
              className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"
            />
            <span className="text-white font-semibold mt-2">Settings</span>
          </Link>

          <Link
            to="/user/all-notes"
            className="bg-slate-400 rounded-[2rem] flex flex-col items-center justify-center hover:scale-105 hover:bg-slate-500 transition-all shadow-lg group"
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
