import React from "react";
import { useLocation, Link } from "react-router-dom";

import { MapPin, IndianRupee, ArrowRight, SearchX, Star, Building2, ChevronLeft } from "lucide-react";

const SearchResults = () => {
  const { state } = useLocation();

  /* ---------------- EMPTY STATE / NO DATA ---------------- */
  if (!state || !state.hotels) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-[#f8fafc]">
        <div className="bg-white p-8 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center max-w-sm">
          <div className="bg-slate-50 p-5 rounded-3xl mb-6">
            <SearchX className="w-12 h-12 text-slate-300" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            No results found
          </h2>
          <p className="text-slate-500 mt-3 font-medium">
            We couldn't find any hotels. Try searching for a different city or check your spelling.
          </p>
          <Link
            to="/"
            className="mt-8 flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" /> Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  const { hotels, city } = state;

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* HEADER SECTION */}
      <div className="bg-white border-b border-slate-100 mb-10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-4">
                <Building2 className="w-3.5 h-3.5" /> Search Result
              </div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                Hotels in <span className="text-indigo-600 capitalize">{city}</span>
              </h1>
              <p className="text-slate-500 font-medium mt-2">
                We found <span className="text-slate-900 font-bold">{hotels.length}</span> luxury stay{hotels.length !== 1 && "s"} for your trip.
              </p>
            </div>
            
            <Link to="/" className="text-sm font-bold text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition-colors">
               <ChevronLeft className="w-4 h-4" /> Change City
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* NO HOTELS IN SPECIFIC CITY */}
        {hotels.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 border border-dashed border-slate-200 text-center flex flex-col items-center">
            <SearchX className="w-16 h-16 text-slate-200 mb-4" />
            <p className="text-slate-500 font-bold text-xl uppercase tracking-tighter">No hotels available in this city</p>
            <p className="text-slate-400 mt-1">Check back later or explore nearby destinations.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <div
                key={hotel._id}
                className="group bg-white rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-indigo-100/30 transition-all duration-500 border border-slate-100 overflow-hidden flex flex-col"
              >
                {/* IMAGE */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={hotel.Image}
                    alt={hotel.Title}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1 shadow-sm border border-white/20">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-slate-800">4.8</span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {hotel.Title}
                    </h3>
                    <p className="flex items-center gap-1 text-slate-400 text-sm mt-1 font-medium truncate">
                      <MapPin className="w-3.5 h-3.5 text-indigo-500" /> {hotel.Address}, {hotel.City}
                    </p>
                  </div>

                  <hr className="border-slate-50 mb-5" />

                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Price starts at</p>
                      <p className="text-2xl font-black text-slate-900 flex items-center">
                        <IndianRupee className="w-4 h-4 text-indigo-600" />{hotel.price}
                        <span className="text-xs text-slate-400 font-medium ml-1 lowercase tracking-normal">/ night</span>
                      </p>
                    </div>

                    <Link
                      to={`/hotel/${hotel._id}`}
                      className="bg-indigo-600 text-white p-3.5 rounded-2xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all group/btn active:scale-90"
                    >
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
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

export default SearchResults;