import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Landing from "../pages/Landing";
import About from "../pages/About";
import User from "../pages/User";
import Settings from "../pages/Settings";
import Note from "../components/Note";
import AllNotes from "../pages/AllNotes";
import AuthRoute from "./AuthRoute";
import ProtectedRoutes from "./ProtectedRoutes";
const PublicRoutes = () => {
  return (
    <div>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
        </Route>

        <Route path="/user/me" element={<User />} />
        <Route path="/user/settings" element={<Settings />} />
        <Route path="/user/note" element={<Note />} />
        <Route path="/user/all-notes" element={<AllNotes />} />
      </Routes>
    </div>
  );
};

export default PublicRoutes;
