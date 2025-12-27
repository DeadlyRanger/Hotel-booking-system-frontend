import React, { useState } from "react";
import { Link , useNavigate
} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


function Register() {
    const [detail, setDetail] = useState({
        name: "",
        email: "",
        password: ""
    });
    
    const Navigate = useNavigate();
  const  createUser = async()=>{
   try{
    const res = await axios.post('http://localhost:3000/api/user/register',detail);
    toast.success(res.data.message);
    Navigate('/login')
   }
   catch(err){
      console.log(err.message)
   }
     }
//  Navigate('/login'  )   
  
   const handleSubmit =()=>{
       console.log(detail);
       createUser();
   }
  const handleChange = (e) => {
    setDetail({
      ...detail,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* LEFT IMAGE */}
      <div className="hidden md:block w-1/2">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
          alt="register"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">
            Create Account
          </h2>
          <p className="text-gray-500 mb-6">
            Sign up to get started
          </p>

          {/* NAME */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={detail.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={detail.email}
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
              value={detail.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* BUTTON */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Register
          </button>

          {/* FOOTER */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-black font-medium cursor-pointer"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );

}


export default Register;
