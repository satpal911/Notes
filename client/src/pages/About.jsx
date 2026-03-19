import React from "react";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 bg-white dark:bg-slate-950 transition-colors duration-300">
        <h1 className="text-4xl font-bold text-blue-200 text-center my-4">
          About Us
        </h1>
        <div className="flex flex-wrap gap-2 w-full justify-center items-center">
          <div className="border-blue-100 h-50 w-full rounded bg-blue-100 basis-1/3"></div>
          <div className="border-blue-100 h-50 w-full rounded bg-blue-100 basis-1/3"></div>
          <div className="border-blue-100 h-50 w-full rounded bg-blue-100 basis-1/3"></div>
          <div className="border-blue-100 h-50 w-full rounded bg-blue-100 basis-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default About;
