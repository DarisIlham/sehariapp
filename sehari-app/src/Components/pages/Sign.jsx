// src/pages/loginpage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import mount from "../images/fixbg.jpg";

const Newlogin = () => {
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // Redirect after success
        navigate("/new");
      } else {
        const errorData = await res.json();
        alert("Sign up failed: " + errorData.message);
      }
    } catch (error) {
      alert("Error connecting to server: " + error.message);
    }
  };
  const [showPassword, setShowPassword] = useState(false)

  const handleSign = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full px-2.5 bg-gradient-to-br from-pink-300 via-pink-200 to-orange-200 relative font-sans">
      {/* Background overlay */}

      <img
        className="absolute w-full h-full object-cover"
        alt="bg"
        src={mount}
      />

      {/* Glass morphism wrapper */}
      <div className="w-[480px] rounded-2xl p-10 text-center bg-white/10 border border-white/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.37)] transition-all duration-300 ease-in-out relative z-20 hover:shadow-[0_12px_48px_rgba(0,0,0,0.5)]">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <h3 className="opacity-50 text-white text-left mb-2">
            Please enter your details
          </h3>
          <h2 className="text-4xl mb-6 text-white tracking-wide font-bold text-left">
            Welcome Back!
          </h2>

          {/* Username input field */}
          <div className="relative border-b-2 border-white/30 my-5 group">
            <input
              name="name"
              type="text"
              required
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-10 bg-transparent border-none outline-none text-base text-white px-2.5 peer"
            />
            <label className="absolute top-1/2 left-0 -translate-y-1/2 text-white text-base pointer-events-none transition-all duration-300 ease-in-out peer-focus:text-sm peer-focus:top-2.5 peer-focus:-translate-y-[150%] peer-focus:text-purple-900 peer-valid:text-sm peer-valid:top-2.5 peer-valid:-translate-y-[150%] peer-valid:text-purple-900">
              Enter your username
            </label>
          </div>

          {/* Email input field */}
          <div className="relative border-b-2 border-white/30 my-5 group">
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-10 bg-transparent border-none outline-none text-base text-white px-2.5 peer"
            />
            <label className="absolute top-1/2 left-0 -translate-y-1/2 text-white text-base pointer-events-none transition-all duration-300 ease-in-out peer-focus:text-sm peer-focus:top-2.5 peer-focus:-translate-y-[150%] peer-focus:text-purple-900 peer-valid:text-sm peer-valid:top-2.5 peer-valid:-translate-y-[150%] peer-valid:text-purple-900">
              Enter your email
            </label>
          </div>

          {/* Password input field */}
          <div className="relative border-b-2 border-white/30 my-5 group flex">
            <input
               name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                required
                onChange={handleChange}
              className="w-full h-10 bg-transparent border-none outline-none text-base text-white px-2.5 peer"
            />
            
            <label className="absolute top-1/2 left-0 -translate-y-1/2 text-white text-base pointer-events-none transition-all duration-300 ease-in-out peer-focus:text-sm peer-focus:top-2.5 peer-focus:-translate-y-[150%] peer-focus:text-purple-900 peer-valid:text-sm peer-valid:top-2.5 peer-valid:-translate-y-[150%] peer-valid:text-purple-900">
              Enter your password
            </label>
            <span className="mr-2 text-2xl cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </span>
          </div>

          {/* Login button */}
          <button
            type="submit"

            className="bg-purple-900 text-white font-semibold border-none mt-15 py-4 w-[400px] cursor-pointer rounded-2xl text-base border-2 border-transparent transition-all duration-300 ease-in-out hover:text-slate-600 hover:bg-white/20 hover:border-white"
            style={{ backgroundColor: "#271950" }}
          >
            Sign In
          </button>

          {/* Register link */}
          <div className="text-center mt-8 text-white">
            <p>
              Already have an account?{" "}
              <a
                href="#"
                className="text-pink-200 no-underline hover:underline"
                onClick={handleSign}
              >
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Newlogin;
