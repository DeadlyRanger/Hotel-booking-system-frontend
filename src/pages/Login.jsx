import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";
export default function Login() {

  const [details,setDetails] =  useState({
    email:'',
    password:''
  })

  const handleChange =(e)=>{
      setDetails({
        ...details,
        [e.target.name] : e.target.value
      })
  }
  let navigate = useNavigate();
    
  const  handleSubmit=async()=>{
      const user =  await axios.post('http://localhost:3000/api/user/login',details , {
      withCredentials: true 
      }).then((res)=>{
        toast.success(res.data.message)
        navigate('/');
        
      }).catch((err)=> {
        toast.error(err.response.data.message)
      })
      
      
      
      
  
  
    
      
      
      }
     

  
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* LEFT IMAGE */}
      <div className="hidden md:block w-1/2">
        <img
          src="https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="login"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md  bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-3xl text-center font-semibold text-orange-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Please login to your account
          </p>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
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
              name="password"
               onChange={handleChange}
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* BUTTON */}
          <button
          onClick={handleSubmit}
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
            Login
          </button>

          {/* FOOTER */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <span className="text-black font-medium cursor-pointer">
                <Link to={'/register'}>Register</Link>
              
            </span>
          </p>
            
         
          
        
        </div>
      </div>
    </div>
  );
}
