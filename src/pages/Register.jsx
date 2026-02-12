import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { backendcontext } from "../context/ApiContext";

import { User, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";

function Register() {
  const [detail, setDetail] = useState({
    name: "",
    email: "",
    password: ""
  });

  const Navigate = useNavigate();
  let { serverurl } = useContext(backendcontext);

  const createUser = async () => {
    try {
      const res = await axios.post(`${serverurl}/api/user/register`, detail);
      toast.success(res.data.message);
      Navigate('/login');
    }
    catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
      console.log(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Added preventDefault to prevent browser refresh
    console.log(detail);
    createUser();
  };

  const handleChange = (e) => {
    setDetail({
      ...detail,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      
      {/* LEFT SECTION - IMAGE WITH GLASS OVERLAY */}
      <div className="hidden lg:block w-[55%] relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
          alt="register-lifestyle"
          className="w-full h-full object-cover transform scale-105 hover:scale-100 transition-transform duration-1000"
        />
        {/* Glass Overlay Box */}
        <div className="absolute bottom-12 left-12 right-12 bg-indigo-900/40 backdrop-blur-md p-10 rounded-3xl border border-white/20 shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-amber-400 w-6 h-6" />
            <span className="text-white font-bold uppercase tracking-widest text-xs">Join StayEase</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">Your Journey Begins Here</h2>
          <p className="text-white/90 text-lg leading-relaxed max-w-md">
            Create an account to unlock exclusive member rates, manage your bookings easily, and discover hidden gems around the world.
          </p>
        </div>
      </div>

      {/* RIGHT SECTION - FORM */}
      <div className="w-full lg:w-[45%] flex items-center justify-center bg-[#fcfcfe] p-8 md:p-12">
        <div className="w-full max-w-md">
          
          {/* HEADER */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-[#1a1a1a] tracking-tight">
              Create <span className="text-indigo-600">Account</span>
            </h2>
            <p className="text-gray-500 font-medium mt-3">
              Fill in your details to get started with StayEase
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* NAME */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-bold text-[#333] uppercase tracking-wide">
                <User className="w-4 h-4 text-gray-400" /> Full Name
              </label>
              <input
                type="text"
                name="name"
                value={detail.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full px-5 py-3.5 bg-[#f8f9fb] border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-gray-400 font-medium"
              />
            </div>

            {/* EMAIL */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-bold text-[#333] uppercase tracking-wide">
                <Mail className="w-4 h-4 text-gray-400" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                value={detail.email}
                onChange={handleChange}
                placeholder="demo@stayease.com"
                required
                className="w-full px-5 py-3.5 bg-[#f8f9fb] border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-gray-400 font-medium"
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-bold text-[#333] uppercase tracking-wide">
                <Lock className="w-4 h-4 text-gray-400" /> Create Password
              </label>
              <input
                type="password"
                name="password"
                value={detail.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-5 py-3.5 bg-[#f8f9fb] border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-gray-400 font-medium"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full bg-[#0f172a] text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-slate-200 hover:bg-black hover:-translate-y-1 transition-all active:scale-[0.98] flex items-center justify-center gap-3 mt-6"
            >
              Register <ArrowRight className="w-5 h-5" />
            </button>

            {/* LOGIN LINK */}
            <p className="text-center text-sm font-medium text-gray-500 mt-8">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 font-bold hover:underline decoration-2 underline-offset-4"
              >
                Sign In
              </Link>
            </p>
          </form>

          {/* SECURITY BADGE */}
          <div className="mt-12 flex justify-center opacity-50">
            <span className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-bold">
              StayEase Data Security Guaranteed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;