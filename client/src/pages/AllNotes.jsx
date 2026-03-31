import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Trash2, Edit3, Calendar, Search, X, Check } from "lucide-react";
import Navbar from "../components/Navbar";

const AllNotes = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ id: "", name: "", content: "" });

  const token = localStorage.getItem("token");

  const fetchNotes = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/note/readNote",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const data = response.data.notes || response.data.data || response.data;
      setNotes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchNotes();
  }, [token, fetchNotes]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await axios.delete(
          `http://localhost:4000/api/v1/note/deleteNote/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        // Remove from local state immediately
        setNotes(notes.filter((note) => note._id !== id && note.id !== id));
      } catch (error) {
        alert("Failed to delete note", error);
      }
    }
  };

  const handleEditClick = (note) => {
    setEditData({
      id: note._id || note.id,
      name: note.name,
      content: note.description || note.content,
    });
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:4000/api/v1/note/updateNote/${editData.id}`,
        {
          name: editData.name,
          description: editData.content,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setIsEditing(false);
      fetchNotes();
      alert("Note updated successfully!");
    } catch (error) {
      alert("Update failed", error);
    }
  };

  const filteredNotes = notes.filter((note) => {
    const name = note.name || "";
    const body = note.description || note.content || "";
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      body.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />

      <div className="flex-1 w-full max-w-6xl mx-auto p-6 overflow-y-auto">
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold dark:text-white">Edit Note</h3>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
              <input
                className="w-full p-3 mb-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                placeholder="name"
              />
              <textarea
                className="w-full p-3 h-40 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                value={editData.content}
                onChange={(e) =>
                  setEditData({ ...editData, content: e.target.value })
                }
                placeholder="Start typing..."
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-sm font-semibold text-slate-500 hover:text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg transition-all font-semibold cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 mt-4 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Your Notes
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Manage and organize your thoughts.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all"
            />
          </div>

          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-4 py-1.5 rounded-full uppercase tracking-wider shrink-0">
            {filteredNotes.length} Found
          </span>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-400">
            Loading your notes...
          </div>
        ) : filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
            {filteredNotes.map((note) => (
              <div
                key={note._id || note.id}
                className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between h-52"
              >
                <div>
                  <h3 className="font-black text-xl text-slate-800 dark:text-slate-100 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                    {note.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium line-clamp-3 mt-3 leading-relaxed">
                    {note.description || note.content}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-tighter">
                    <Calendar size={12} className="mr-1" />
                    {note.date ||
                      new Date(note.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                  </div>

                  <div className="flex gap-2 opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditClick(note)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all cursor-pointer"
                    >
                      <Edit3 size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(note._id || note.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
              No notes match your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllNotes;
