import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendcontext } from "../context/ApiContext";

import { Pencil, Trash2, MapPin, IndianRupee, Building2, Plus } from "lucide-react";

const MyListings = () => {
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();
  let { serverurl } = useContext(backendcontext);

  const deleteHotel = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    try {
      await axios.delete(`${serverurl}/api/listings/hotels/${id}`, { withCredentials: true });
      fetchDetails();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDetails = async () => {
    try {
      const hotels = await axios.get(
        `${serverurl}/api/listings/managehotels`,
        { withCredentials: true }
      );
      setDetails(hotels.data.hotels);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 sm:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              My <span className="text-indigo-600">Listings</span>
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Manage and update your property portfolio.
            </p>
          </div>
          <button 
            onClick={() => navigate('/admin/addhotel')}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" /> Add New Hotel
          </button>
        </div>

        {details.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 border border-dashed border-slate-200 text-center flex flex-col items-center">
            <div className="bg-slate-50 p-4 rounded-full mb-4">
              <Building2 className="w-10 h-10 text-slate-300" />
            </div>
            <p className="text-slate-500 font-bold text-lg">No hotels added yet.</p>
            <p className="text-slate-400 text-sm mb-6">Start by listing your first property on StayEase.</p>
            <button 
              onClick={() => navigate('/admin/addhotel')}
              className="text-indigo-600 font-bold hover:underline"
            >
              Click here to get started
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {details.map((item) => (
              <div
                key={item._id}
                className="group bg-white rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-indigo-100/30 transition-all duration-500 border border-slate-100 overflow-hidden flex flex-col"
              >
                {/* Image Section */}
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src={item.Image}
                    alt={item.Title}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-600 shadow-sm">
                      Live Listing
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {item.Title}
                    </h2>
                  </div>

                  <div className="space-y-3 mb-6">
                    <p className="flex items-center gap-1.5 text-slate-400 text-xs font-bold uppercase tracking-tighter">
                      <MapPin className="w-3.5 h-3.5 text-indigo-500" /> {item.City}
                    </p>
                    <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed italic">
                      "{item.Description}"
                    </p>
                    <p className="flex items-center gap-1 text-2xl font-black text-slate-900">
                      <IndianRupee className="w-4 h-4 text-indigo-600" /> {item.price}
                      <span className="text-xs text-slate-400 font-medium lowercase tracking-normal">/ night</span>
                    </p>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex gap-3 mt-auto">
                    <button 
                      onClick={() => navigate(`/admin/edithotel/${item._id}`)}
                      className="flex-1 flex items-center justify-center gap-2 border-2 border-slate-100 text-slate-600 py-3 rounded-2xl font-bold hover:bg-indigo-50 hover:border-indigo-100 hover:text-indigo-600 transition-all active:scale-95"
                    >
                      <Pencil className="w-4 h-4" /> Edit
                    </button>

                    <button
                      onClick={() => deleteHotel(item._id)}
                      className="flex-1 flex items-center justify-center gap-2 border-2 border-rose-50 text-rose-500 py-3 rounded-2xl font-bold hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all active:scale-95 shadow-sm"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;