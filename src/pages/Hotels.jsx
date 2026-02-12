import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendcontext } from "../context/ApiContext";

import { MapPin, IndianRupee, ArrowRight, Star, Building2 } from "lucide-react";

const Hotels = () => {
  const [details, setDetails] = useState([]);
  let navigate = useNavigate();

  let { serverurl } = useContext(backendcontext);
  
  const fetchDetails = async () => {
    try {
      const res = await axios.get(`${serverurl}/api/listings/allhotels`);
      setDetails(res.data.Listing || res.data.listing || []);
    } catch (err) {
      console.error("API ERROR ❌", err);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  /* ---------------- LOGIC: NAVIGATE AND RELOAD ---------------- */
  const handleViewDetails = (id) => {
  
    navigate(`hotel/${id}`);
    

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 sm:px-8 py-12">
      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-4">
          <Building2 className="w-3.5 h-3.5" /> Explore Stays
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight sm:text-5xl">
          Available <span className="text-indigo-600">Hotels</span>
        </h1>
        <p className="mt-4 text-slate-500 font-medium max-w-2xl mx-auto">
          Discover handpicked hotels with world-class amenities and the best prices guaranteed.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {details.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-dashed border-slate-200 text-center">
            <p className="text-slate-400 font-medium italic">No hotels found in our database.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {details.map((item) => (
              <div
                key={item._id}
                className="group bg-white rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500 border border-slate-100 overflow-hidden flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={item.Image}
                    alt={item.Title}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-slate-800">4.5</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {item.Title}
                    </h2>
                    <p className="flex items-center gap-1 text-slate-400 text-sm mt-1 font-medium italic">
                      <MapPin className="w-3.5 h-3.5 text-indigo-500" /> {item.City}
                    </p>
                  </div>

                  <hr className="border-slate-50 mb-5" />

                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Starts from</p>
                      <p className="text-2xl font-black text-slate-900 flex items-center">
                        <IndianRupee className="w-4 h-4" />{item.price}
                        <span className="text-xs text-slate-400 font-medium ml-1 lowercase">/ night</span>
                      </p>
                    </div>

                    <button 
                      onClick={() => handleViewDetails(item._id)}
                      className="bg-indigo-600 text-white p-3.5 rounded-2xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all group/btn"
                    >
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-16 text-center">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
          All properties are verified by StayEase
        </p>
      </div>
    </div>
  );
};

export default Hotels;