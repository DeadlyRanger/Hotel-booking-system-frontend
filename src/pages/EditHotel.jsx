import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { backendcontext } from "../context/ApiContext";

import { 
  Building2, 
  IndianRupee, 
  MapPin, 
  Phone, 
  ImageIcon, 
  FileText, 
  Settings2, 
  ArrowLeft 
} from "lucide-react";

const EditHotel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { serverurl } = useContext(backendcontext);

  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    price: "",
    Address: "",
    City: "",
    Contact: "",
    Image: ""
  });

  // Fetch existing data (Logic added to ensure the "Edit" actually has data to edit)
  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const res = await axios.get(`${serverurl}/api/listings/hotels/${id}`);
        setFormData(res.data.hotel);
      } catch (err) {
        toast.error("Failed to load hotel data");
      }
    };
    fetchHotelData();
  }, [id, serverurl]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const edithotel = async () => {
    try {
      await axios.put(`${serverurl}/api/listings/hotels/${id}`, formData, {
        withCredentials: true
      });
      toast.success('Hotel modified successfully');
      navigate('/');
    }
    catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    edithotel();
    console.log("Updated Hotel Data:", formData);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl shadow-indigo-100/50 border border-gray-100 overflow-hidden">
        
        {/* TOP ACCENT BAR */}
        <div className="h-2 bg-indigo-600 w-full"></div>

        <div className="p-8 sm:p-10">
          {/* HEADER SECTION */}
          <div className="flex justify-between items-start mb-10">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="text-center flex-1 pr-10">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-50 rounded-2xl mb-4">
                <Settings2 className="w-7 h-7 text-indigo-600" />
              </div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                Modify Hotel
              </h1>
              <p className="text-gray-500 mt-2 font-medium">
                Update the information for your listed property
              </p>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* HOTEL TITLE */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                <Building2 className="w-4 h-4 text-indigo-500" /> Hotel Title
              </label>
              <input
                type="text"
                name="Title"
                value={formData.Title}
                onChange={handleChange}
                placeholder="Grand Luxury Suite"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                <FileText className="w-4 h-4 text-indigo-500" /> Description
              </label>
              <textarea
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                rows="4"
                placeholder="Update your hotel amenities, service details..."
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium resize-none"
              />
            </div>

            {/* PRICE & CITY GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                  <IndianRupee className="w-4 h-4 text-indigo-500" /> Price per Night
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="2500"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                  <MapPin className="w-4 h-4 text-indigo-500" /> City
                </label>
                <input
                  type="text"
                  name="City"
                  value={formData.City}
                  onChange={handleChange}
                  placeholder="Indore"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                />
              </div>
            </div>

            {/* ADDRESS */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                <MapPin className="w-4 h-4 text-indigo-500" /> Full Address
              </label>
              <input
                type="text"
                name="Address"
                value={formData.Address}
                onChange={handleChange}
                placeholder="123, Main Road, Near Square"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
              />
            </div>

            {/* CONTACT & IMAGE URL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                  <Phone className="w-4 h-4 text-indigo-500" /> Contact No.
                </label>
                <input
                  type="number"
                  name="Contact"
                  value={formData.Contact}
                  onChange={handleChange}
                  placeholder="9876543210"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                  <ImageIcon className="w-4 h-4 text-indigo-500" /> Image URL
                </label>
                <input
                  type="text"
                  name="Image"
                  value={formData.Image}
                  onChange={handleChange}
                  placeholder="https://images.com/hotel.jpg"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all active:scale-[0.98]"
              >
                Save Changes
              </button>
            </div>
          </form>

          {/* FOOTER */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 text-center uppercase tracking-widest flex items-center justify-center gap-2">
              <Settings2 className="w-3 h-3" /> Property Revision System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHotel;