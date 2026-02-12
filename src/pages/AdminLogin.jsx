import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { backendcontext } from "../context/ApiContext";
import { Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { serverurl, setUserrole } = useContext(backendcontext);

  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!details.email || !details.password) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const res = await axios.post(`${serverurl}/api/user/login`, details, { withCredentials: true });
      setUserrole(res.data.user.role);
      toast.success(res.data.message || "Login successful");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      
      {/* LEFT SECTION - IMAGE WITH GLASS OVERLAY */}
      <div className="hidden lg:block w-[55%] relative">
        <img
          src="https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?q=80&w=1170&auto=format&fit=crop"
          alt="resort"
          className="w-full h-full object-cover"
        />
        {/* The Purple Glass Box from your image */}
        <div className="absolute bottom-12 left-12 right-12 bg-indigo-900/40 backdrop-blur-md p-10 rounded-3xl border border-white/20 shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-3">Centralized Control</h2>
          <p className="text-white/90 text-lg leading-relaxed max-w-md">
            Managing StayEase properties and users has never been more intuitive. Log in to your secure workspace.
          </p>
        </div>
      </div>

      {/* RIGHT SECTION - LOGIN FORM */}
      <div className="w-full lg:w-[45%] flex items-center justify-center bg-[#fcfcfe] p-8">
        <div className="w-full max-w-md">
          
          {/* ICON & TITLE */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-rose-50 rounded-xl mb-4 border border-rose-100 shadow-sm">
              <ShieldCheck className="w-6 h-6 text-rose-500" />
            </div>
            <h2 className="text-4xl font-extrabold text-[#1a1a1a] tracking-tight">
              Admin <span className="text-rose-600">Portal</span>
            </h2>
            <p className="text-gray-500 font-medium mt-3">
              Enter your credentials to manage the platform
            </p>
          </div>

          <div className="space-y-6">
            {/* EMAIL */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-[#333]">
                <Mail className="w-4 h-4 text-gray-400" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                value={details.email}
                onChange={handleChange}
                placeholder="admin@stayease.com"
                className="w-full px-5 py-4 bg-[#f8f9fb] border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-gray-400"
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-sm font-bold text-[#333]">
                  <Lock className="w-4 h-4 text-gray-400" /> Password
                </label>
                <button className="text-xs font-bold text-rose-600 hover:text-rose-700">Forgot?</button>
              </div>
              <input
                type="password"
                name="password"
                value={details.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-[#f8f9fb] border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            {/* SIGN IN BUTTON */}
            <button
              onClick={handleSubmit}
              className="w-full bg-[#0f172a] text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-slate-200 hover:bg-black transition-all flex items-center justify-center gap-3 mt-4"
            >
              Sign In <ArrowRight className="w-5 h-5" />
            </button>

            {/* REQUEST ACCESS */}
            <p className="text-center text-sm font-medium text-gray-500 mt-8 pt-4">
              Need authorized admin access?{" "}
              <Link to="/admin/register" className="text-rose-600 font-bold hover:underline">
                Request Permission
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}