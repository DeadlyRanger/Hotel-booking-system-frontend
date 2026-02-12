import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { backendcontext } from "../context/ApiContext";
import { Mail, Lock, ArrowRight, UserCheck } from "lucide-react";

export default function Login() {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  // 🔥 CONTEXT
  const {
    serverurl,
    setIsLoggedIn,
    setUserrole,
  } = useContext(backendcontext);

  /* ---------------- LOGIN ---------------- */
  const handleSubmit = async () => {
    if (!details.email || !details.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.post(
        `${serverurl}/api/user/login`,
        details,
        { withCredentials: true }
      );
          
      // ✅ SUCCESS
      toast.success(res.data.message);
      
      const role = res.data.user.role;
      setUserrole(role);
      setIsLoggedIn(true);

      // 🔁 REDIRECT BASED ON RESPONSE ROLE (Immediate)
      if (role === 'admin') {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      
      {/* LEFT SECTION - IMAGE WITH GLASS OVERLAY */}
      <div className="hidden lg:block w-[55%] relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?q=80&w=1170&auto=format&fit=crop"
          alt="login-resort"
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
        />
        {/* Glass Overlay Box */}
        <div className="absolute bottom-12 left-12 right-12 bg-indigo-900/40 backdrop-blur-md p-10 rounded-3xl border border-white/20 shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">Experience Comfort</h2>
          <p className="text-white/90 text-lg leading-relaxed max-w-md">
            Your next luxury escape is just a few clicks away. Log in to access your personalized travel dashboard.
          </p>
        </div>
      </div>

      {/* RIGHT SECTION - LOGIN FORM */}
      <div className="w-full lg:w-[45%] flex items-center justify-center bg-[#fcfcfe] p-8 md:p-12">
        <div className="w-full max-w-md">
          
          {/* ICON & TITLE */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-50 rounded-2xl mb-4 border border-indigo-100 shadow-sm">
              <UserCheck className="w-7 h-7 text-indigo-600" />
            </div>
            <h2 className="text-4xl font-black text-[#1a1a1a] tracking-tight">
              Welcome <span className="text-indigo-600">Back</span>
            </h2>
            <p className="text-gray-500 font-medium mt-3">
              Please enter your details to sign in
            </p>
          </div>

          <div className="space-y-6">
            {/* EMAIL */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-[#333] uppercase tracking-wide">
                <Mail className="w-4 h-4 text-gray-400" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="demo@stayease.com"
                className="w-full px-5 py-4 bg-[#f8f9fb] border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-gray-400 font-medium"
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-sm font-bold text-[#333] uppercase tracking-wide">
                  <Lock className="w-4 h-4 text-gray-400" /> Password
                </label>
                <Link to="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Forgot Password?</Link>
              </div>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-[#f8f9fb] border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
              />
            </div>

            {/* LOGIN BUTTON */}
            <button
              onClick={handleSubmit}
              className="w-full bg-[#0f172a] text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-slate-200 hover:bg-black hover:-translate-y-1 transition-all active:scale-[0.98] flex items-center justify-center gap-3 mt-4"
            >
              Login <ArrowRight className="w-5 h-5" />
            </button>

            {/* REGISTER LINK */}
            <p className="text-center text-sm font-medium text-gray-500 mt-10">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-600 font-bold hover:underline decoration-2 underline-offset-4"
              >
                Create Account
              </Link>
            </p>
          </div>

          <div className="mt-12 flex justify-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-bold">
              StayEase Security Verified
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}