import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const EditHotel = () => {
    const {id} = useParams();
  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    price: "",
    Address: "",
    City: "",
    Contact: "",
    Image: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  let navigate = useNavigate();
  
  const  edithotel = async()=>{
   try{
     let data =  await axios.put(`http://localhost:3000/api/listings/hotels/${id}`,formData,{
        withCredentials:true
     });
    toast.success('hotel modified successfully');
     navigate('/');
   }
   catch(err){
     toast.error(err.response.data.message);
   }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
         edithotel();
    // Backend integration later
    console.log("Add Hotel Data:", formData);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 sm:p-8">

        {/* HEADER */}
        <h1 className="text-2xl font-bold text-indigo-600 text-center">
         Modify Hotel Details
        </h1>
        <p className="text-sm text-gray-500 text-center mt-1">
          Enter hotel details to list on platform
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hotel Title
            </label>
            <input
              type="text"
              name="Title"
              value={formData.Title}
              onChange={handleChange}
              placeholder="Hotel Sunshine"
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe hotel amenities, rooms, location..."
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          {/* PRICE & CITY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price per Night (₹)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="2500"
                required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                name="City"
                value={formData.City}
                onChange={handleChange}
                placeholder="Indore"
                required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* ADDRESS */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="Address"
              value={formData.Address}
              onChange={handleChange}
              placeholder="123, Main Road, Near Mall"
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* CONTACT & IMAGE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number
              </label>
              <input
                type="number"
                name="Contact"
                value={formData.Contact}
                onChange={handleChange}
                placeholder="9876543210"
                required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                name="Image"
                value={formData.Image}
                onChange={handleChange}
                placeholder="https://image-url.com/hotel.jpg"
                required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Modify Hotel
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-xs text-gray-400 text-center mt-4">
          Ensure all details are accurate before submission
        </p>
      </div>
    </div>
  );
};

export default EditHotel;
