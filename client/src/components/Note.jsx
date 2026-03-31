import React, { useState, useContext } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { UserContext } from "../context/UserContext";

function Note() {
  const { user } = useContext(UserContext);
  const [formdata, setFormdata] = useState({ title: "", content: "" });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!user) return alert("Please login first!");
    if (!formdata.title.trim() || !formdata.content.trim()) {
      return alert("Frontend validation: Please fill all fields!");
    }

    setIsSaving(true);
    const token = localStorage.getItem("token") || user?.token;

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/note/createNote",
        {
          name: formdata.title,
          description: formdata.content,
          userId: user?._id || user?.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success || response.status === 201) {
        setFormdata({ title: "", content: "" });
        alert("Note saved successfully!");
      }
    } catch (error) {
      console.error("Full Axios Error Object:", error.response);

      const backendMessage = error.response?.data?.message || "Server Error";
      alert(`Backend Error: ${backendMessage}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 w-full transition-colors duration-300">
      <Navbar />
      <div className="flex-1 flex flex-col justify-center items-center p-4 md:p-8 overflow-hidden">
        <div className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Create New Note
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Keep your thoughts organized.
          </p>
        </div>
        <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl flex flex-col max-h-[75vh] transition-all">
          <div className="px-6 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex justify-between items-center shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Note Details
            </span>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/50"></div>
            </div>
          </div>
          <div className="p-6 space-y-4 flex-1 overflow-hidden flex flex-col">
            <div className="shrink-0">
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1 ml-1">
                Title
              </label>
              <input
                name="title"
                value={formdata.title}
                onChange={handleChange}
                type="text"
                placeholder="Note Title"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1 ml-1">
                Content
              </label>
              <textarea
                name="content"
                value={formdata.content}
                onChange={handleChange}
                placeholder="Start typing..."
                className="w-full flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all resize-none"
              ></textarea>
            </div>
          </div>
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end items-center gap-3 shrink-0">
            <button
              onClick={() => setFormdata({ title: "", content: "" })}
              className="text-sm font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg transition-all font-semibold shadow-md shadow-blue-600/20 active:scale-95 cursor-pointer disabled:bg-blue-400"
            >
              {isSaving ? "Saving..." : "Save Note"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Note;
