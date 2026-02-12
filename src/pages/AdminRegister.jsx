import React, { useContext, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { backendcontext } from "../context/ApiContext";
import { User, Mail, Lock, ArrowRight, ShieldPlus } from "lucide-react";

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });


  const { serverurl } = useContext(backendcontext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const registerAdmin = async () => {
    try {
      await axios.post(`${serverurl}/api/user/register`, { ...formData, role: 'admin' });
      toast.success('Admin registered successfully');
      navigate('/login');
    }
    catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerAdmin();
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      
      {/* LEFT SECTION - IMAGE WITH GLASS OVERLAY (Matches Login) */}
      <div className="hidden lg:block w-[55%] relative">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1170&auto=format&fit=crop"
          alt="office-setup"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-12 left-12 right-12 bg-indigo-900/40 backdrop-blur-md p-10 rounded-3xl border border-white/20 shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-3">Join the Network</h2>
          <p className="text-white/90 text-lg leading-relaxed max-w-md">
            Create your administrative account to start managing listings, bookings, and platform analytics in real-time.
          </p>
        </div>
      </div>

      {/* RIGHT SECTION - REGISTRATION FORM */}
      <div className="w-full lg:w-[45%] flex items-center justify-center bg-[#fcfcfe] p-8">
        <div className="w-full max-w-md">
          
          {/* ICON & TITLE */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-50 rounded-xl mb-4 border border-indigo-100 shadow-sm">
              <ShieldPlus className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-4xl font-extrabold text-[#1a1a1a] tracking-tight">
              Admin <span className="text-indigo-600">Signup</span>
            </h2>
            <p className="text-gray-500 font-medium mt-3">
              Set up your secure administrator profile
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* FULL NAME */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-[#333]">
                <User className="w-4 h-4 text-gray-400" /> Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full px-5 py-4 bg-[#f8f9fb] border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-gray-400 font-medium"
              />
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-[#333]">
                <Mail className="w-4 h-4 text-gray-400" /> Business Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@stayease.com"
                required
                className="w-full px-5 py-4 bg-[#f8f9fb] border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-gray-400 font-medium"
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-[#333]">
                <Lock className="w-4 h-4 text-gray-400" /> Create Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-5 py-4 bg-[#f8f9fb] border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
              />
            </div>

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              className="w-full bg-[#0f172a] text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-slate-200 hover:bg-black transition-all flex items-center justify-center gap-3 mt-4"
            >
              Create Account <ArrowRight className="w-5 h-5" />
            </button>

            {/* FOOTER */}
            <p className="text-center text-sm font-medium text-gray-500 mt-8 pt-4">
              Already have an admin account?{" "}
              <Link to="/admin/login" className="text-indigo-600 font-bold hover:underline transition-all">
                Sign In
              </Link>
            </p>
          </form>
          
          <div className="mt-8 flex justify-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
              Secure Partner Enrollment
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;