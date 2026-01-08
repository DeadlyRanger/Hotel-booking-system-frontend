import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { backendcontext } from "../context/ApiContext";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle login
  const handleSubmit = async () => {
    if (!details.email || !details.password) {
      toast.error("Please fill all required fields");
      return;
    }

     let {serverurl,userrole,setUserrole} = useContext(backendcontext);
    try {
      const res = await axios.post(
        `${serverurl}/api/user/login`,
        details,
        { withCredentials: true }
      );
             setUserrole(res.data.user.role);
      toast.success(res.data.message || "Login successful");
      navigate("/");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Invalid email or password"
      );
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* LEFT IMAGE */}
      <div className="hidden md:block w-1/2">
        <img
          src="https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?q=80&w=1170&auto=format&fit=crop"
          alt="admin-login"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-3xl text-center font-semibold text-orange-800 mb-2">
            Admin Login
          </h2>

          <p className="text-gray-500 text-center mb-6">
            Sign in to access the admin dashboard
          </p>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={details.email}
              onChange={handleChange}
              placeholder="demo@site.com"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={details.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Login
          </button>

          {/* FOOTER */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Need admin access?{" "}
            <Link
              to="/admin/register"
              className="text-black font-medium hover:underline"
            >
              Request access
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
