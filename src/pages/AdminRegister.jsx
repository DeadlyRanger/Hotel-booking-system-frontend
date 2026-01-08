import React, { useContext, useState } from "react";
import axios from 'axios'
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { backendcontext } from "../context/ApiContext";



const AdminRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  let {serverurl,userrole,setUserrole} = useContext(backendcontext);
  let navigate = useNavigate();
  const registerAdmin =async()=>{
     try{
         let user = await axios.post(`${serverurl}/api/user/register`,{...formData,role:'admin'});
         toast.success('Admin registerd successfully');
          navigate('/login');
        
     }
     catch(err){
       toast.error(err.response.data.message);
     }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    registerAdmin();
 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">

        {/* HEADER */}
        <h1 className="text-2xl font-bold text-center text-indigo-600">
          Admin Registration
        </h1>
        <p className="text-sm text-gray-500 text-center mt-1">
          Create an admin account
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          {/* NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Admin Name"
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Register Admin
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-xs text-gray-400 text-center mt-4">
          Only authorized users should create admin accounts
        </p>
      </div>
    </div>
  );
};

export default AdminRegister;
