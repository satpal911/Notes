import React, { useContext } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import  {UserContext}  from "../context/UserContext";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { register, loading } = useContext(UserContext);

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
      console.log(formData);
      await register(formData.name, formData.email, formData.password);
      toast.success("User registered successfully");
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      toast.error(error || "Something went wrong")
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-center text-2xl font-bold mb-4">Register here</h1>
      <form
        onSubmit={handleSubmit}
        className="border-4 border-gray-200 flex flex-col w-96 p-8 rounded-lg items-center justify-around gap-4 shadow-lg"
      >
        <input
          type="text"
          placeholder="Enter your name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

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
          placeholder="create your password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 cursor-pointer bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
