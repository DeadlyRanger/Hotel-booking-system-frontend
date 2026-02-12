import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { backendcontext } from "../context/ApiContext";

import { MapPin, Phone, Calendar, IndianRupee, Info, LogOut, ChevronLeft, Star } from "lucide-react";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    serverurl,
    isLoggedIn,
    setUserrole,
    setIsLoggedIn,
  } = useContext(backendcontext);

  const [hoteldata, setHotelData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookingLoading, setBookingLoading] = useState(false);

  /* ---------------- AUTH GUARD ---------------- */
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  /* ---------------- FETCH HOTEL ---------------- */
  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchHotel = async () => {
      try {
        const res = await axios.get(
          `${serverurl}/api/listings/hotels/${id}`
        );
        setHotelData(res.data.hotel);
      } catch (err) {
        navigate("/");
        alert("Unable to fetch hotel details");
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id, serverurl, isLoggedIn, navigate]);

  /* ---------------- PRICE CALCULATION ---------------- */
  useEffect(() => {
    if (checkIn && checkOut && hoteldata) {
      const days =
        (new Date(checkOut) - new Date(checkIn)) /
        (1000 * 60 * 60 * 24);

      setTotalPrice(days > 0 ? days * hoteldata.price : 0);
    }
  }, [checkIn, checkOut, hoteldata]);

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserrole(null);
    navigate("/login");
  };

  /* ---------------- BOOKING ---------------- */
  const handleBooking = async () => {
    if (!checkIn || !checkOut) {
      alert("Please select both dates");
      return;
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      alert("Check-out must be after check-in");
      return;
    }

    try {
      setBookingLoading(true);

      await axios.post(
        `${serverurl}/api/listing/bookings/${id}`,
        { checkIn, checkOut },
        { withCredentials: true }
      );

      alert("Booking successful ✅");
      navigate("/profile");
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed ❌");
    } finally {
      setBookingLoading(false);
    }
  };

  /* ---------------- UI STATES ---------------- */
  if (!isLoggedIn) return null;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium">Fetching hotel details...</p>
      </div>
    );
  }

  if (!hoteldata) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
          <Info className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800">Hotel not found</h2>
          <button onClick={() => navigate('/')} className="mt-4 text-indigo-600 font-bold hover:underline">Return Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-12">
      {/* NAVBAR AREA / HEADER */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-medium text-sm"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Search
          </button>
          
          <div className="flex items-center gap-4">
             <span className="hidden sm:block text-xs font-bold text-slate-400 uppercase tracking-widest">Booking Mode</span>
             {isLoggedIn && (
               <button
                 onClick={handleLogout}
                 className="flex items-center gap-2 text-sm text-rose-500 font-bold px-4 py-2 rounded-xl hover:bg-rose-50 transition-all border border-transparent hover:border-rose-100"
               >
                 <LogOut className="w-4 h-4" /> Logout
               </button>
             )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: CONTENT (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="relative">
                <img
                  src={hoteldata.Image}
                  alt={hoteldata.Title}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                   <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                   <span className="text-xs font-bold text-slate-800">4.8 (Recent stays)</span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2">{hoteldata.Title}</h1>
                    <p className="flex items-center gap-1 text-slate-500 font-medium italic">
                      <MapPin className="w-4 h-4 text-indigo-500" /> {hoteldata.Address}, {hoteldata.City}
                    </p>
                  </div>
                </div>

                <hr className="my-6 border-slate-100" />

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Info className="w-5 h-5 text-indigo-500" /> About this property
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {hoteldata.Description}
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <Phone className="w-5 h-5 text-indigo-600" />
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Contact Property</p>
                        <p className="text-sm font-bold text-slate-700">{hoteldata.Contact}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <Star className="w-5 h-5 text-indigo-600" />
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Location</p>
                        <p className="text-sm font-bold text-slate-700">{hoteldata.City}</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: BOOKING CARD (4 cols) */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sticky top-24">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <p className="text-3xl font-black text-slate-900">₹{hoteldata.price}</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">total per night</p>
                </div>
                <div className="text-right">
                   <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md font-bold">Best Price</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-tight ml-1">
                    <Calendar className="w-3.5 h-3.5" /> Check-In
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-tight ml-1">
                    <Calendar className="w-3.5 h-3.5" /> Check-Out
                  </label>
                  <input
                    type="date"
                    min={checkIn || new Date().toISOString().split("T")[0]}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                  />
                </div>

                {totalPrice > 0 && (
                  <div className="mt-6 p-4 bg-indigo-50 rounded-2xl border border-indigo-100 animate-in fade-in zoom-in duration-300">
                    <div className="flex justify-between items-center mb-1 text-indigo-900 font-bold">
                       <span>Estimated Total</span>
                       <span className="text-lg">₹{totalPrice}</span>
                    </div>
                    <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest text-center">Taxes & Fees included</p>
                  </div>
                )}

                <button
                  onClick={handleBooking}
                  disabled={bookingLoading}
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 active:scale-[0.98] transition-all disabled:opacity-50 disabled:translate-y-0 mt-4 flex items-center justify-center gap-2"
                >
                  {bookingLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    "Book Your Stay"
                  )}
                </button>
                
                <p className="text-[11px] text-slate-400 font-medium text-center italic mt-4">
                  * Confirmation will be sent to your profile.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Booking;