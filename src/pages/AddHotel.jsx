import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { backendcontext } from "../context/ApiContext";

import { Building2, IndianRupee, MapPin, Phone, ImageIcon, FileText, PlusCircle } from "lucide-react";

const AddHotel = () => {
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
  let { serverurl, userrole, setUserrole } = useContext(backendcontext);

  const addhotel = async () => {
    try {
      let data = await axios.post(`${serverurl}/api/listings/addhotel`, formData, {
        withCredentials: true
      });
      toast.success('hotel added successfully');
      navigate('/');
    }
    catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addhotel();
    console.log("Add Hotel Data:", formData);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl shadow-indigo-100/50 border border-gray-100 overflow-hidden">
        
        {/* DECORATIVE TOP BAR */}
        <div className="h-2 bg-indigo-600 w-full"></div>

        <div className="p-8 sm:p-10">
          {/* HEADER */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-full mb-4">
              <PlusCircle className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              List Your Property
            </h1>
            <p className="text-gray-500 mt-2 font-medium">
              Reach thousands of travelers by adding your hotel to StayEase
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* HOTEL TITLE */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Building2 className="w-4 h-4 text-indigo-500" /> Hotel Title
              </label>
              <input
                type="text"
                name="Title"
                value={formData.Title}
                onChange={handleChange}
                placeholder="e.g. Grand Palace Resort"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-400"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FileText className="w-4 h-4 text-indigo-500" /> Description
              </label>
              <textarea
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                rows="4"
                placeholder="Tell guests what makes your hotel special..."
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none placeholder:text-gray-400"
              />
            </div>

            {/* PRICE & CITY GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <IndianRupee className="w-4 h-4 text-indigo-500" /> Price per Night
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="2500"
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-4 py-3 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <MapPin className="w-4 h-4 text-indigo-500" /> City
                </label>
                <input
                  type="text"
                  name="City"
                  value={formData.City}
                  onChange={handleChange}
                  placeholder="Indore"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            {/* ADDRESS */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <MapPin className="w-4 h-4 text-indigo-500" /> Full Address
              </label>
              <input
                type="text"
                name="Address"
                value={formData.Address}
                onChange={handleChange}
                placeholder="123, Main Road, Near Landmark"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* CONTACT & IMAGE GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Phone className="w-4 h-4 text-indigo-500" /> Contact Number
                </label>
                <input
                  type="number"
                  name="Contact"
                  value={formData.Contact}
                  onChange={handleChange}
                  placeholder="9876543210"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <ImageIcon className="w-4 h-4 text-indigo-500" /> Hotel Image URL
                </label>
                <input
                  type="text"
                  name="Image"
                  value={formData.Image}
                  onChange={handleChange}
                  placeholder="https://image-url.com/hotel.jpg"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all active:scale-[0.98]"
              >
                Publish Hotel Listing
              </button>
            </div>
          </form>

          {/* FOOTER */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">
              Verified Partner Submission
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHotel;