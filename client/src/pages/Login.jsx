import React, { useContext } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, loading } = useContext(UserContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      toast.success("User loggedIn successfully");
      setFormData({ email: "", password: "" });
    } catch (error) {
      toast.error(error || "Something went wrong");
    }
  };
  return (
    <div className="flex flex-col min-h-screen  bg-white dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-center text-4xl font-bold mb-4 text-blue-600">
          Login here
        </h1>
        <form
          onSubmit={handleSubmit}
          className="border-4 border-gray-200 flex flex-col w-96 p-8 rounded-lg items-center justify-around gap-4 shadow-lg"
        >
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 cursor-pointer bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-gray-600">
          Don't have an account?
          <Link
            to="/register"
            className="ml-1 text-blue-900 font-bold hover:underline"
          >
            register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
