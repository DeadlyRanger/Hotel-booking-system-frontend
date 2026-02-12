import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendcontext } from "../context/ApiContext";

import { User, Mail, Calendar, MapPin, IndianRupee, LogOut, Ticket, Trash2 } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  let { serverurl, setIsLoggedIn, setUserrole } = useContext(backendcontext);

  /* ---------------- FETCH PROFILE ---------------- */
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${serverurl}/api/user/profile`, // Fixed hardcoded URL
        { withCredentials: true }
      );
      setUser(res.data.user);
    } catch (err) {
      console.log("PROFILE ERROR:", err.response?.data);
    }
  };

  /* ---------------- FETCH MY BOOKINGS ---------------- */
  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        `${serverurl}/api/listing/bookings/my`,
        { withCredentials: true }
      );
      setBookings(res.data.bookings);
    } catch (err) {
      console.log("BOOKING FETCH ERROR:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- CANCEL BOOKING ---------------- */
  const cancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await axios.delete(
        `${serverurl}/api/listing/bookings/${bookingId}`,
        { withCredentials: true }
      );
      alert("Booking cancelled ✅");
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Cancel failed ❌");
    }
  };

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = async () => {
    try {
      await axios.post(
        `${serverurl}/api/user/logout`,
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      setUserrole(null);
      navigate("/login");
    } catch {
      alert("Logout failed");
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchBookings();
  }, []);

  /* ---------------- UI STATES ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium">Loading your profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
          <User className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800">Session Expired</h2>
          <p className="text-slate-500 mb-6">Please login to view your profile and bookings.</p>
          <button 
            onClick={() => navigate('/login')}
            className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 sm:px-6 py-12">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">My <span className="text-indigo-600">Profile</span></h1>
            <p className="text-slate-500 font-medium">Manage your account and view your trips.</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-rose-500 font-bold px-5 py-2.5 rounded-2xl hover:bg-rose-50 transition-all border border-transparent hover:border-rose-100"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: ACCOUNT INFO */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-indigo-600 h-24"></div>
              <div className="px-6 pb-8">
                <div className="relative -top-10">
                  <div className="w-20 h-20 bg-white rounded-2xl shadow-md flex items-center justify-center border-4 border-white mb-4">
                    <User className="w-10 h-10 text-indigo-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
                  <p className="text-slate-500 text-sm font-medium">{user.email}</p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Email Verified</p>
                      <p className="text-xs font-bold text-slate-700 truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <Ticket className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Total Bookings</p>
                      <p className="text-xs font-bold text-slate-700">{bookings.length} Stays</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: BOOKINGS LIST */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" /> Recent Bookings
              </h2>

              {bookings.length === 0 ? (
                <div className="text-center py-10">
                  <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Ticket className="w-8 h-8 text-slate-300" />
                  </div>
                  <p className="text-slate-400 font-medium">You haven't made any bookings yet.</p>
                  <button 
                    onClick={() => navigate('/')}
                    className="mt-4 text-indigo-600 font-bold hover:underline"
                  >
                    Browse Hotels
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="group p-5 bg-white border border-slate-100 rounded-2xl hover:border-indigo-100 hover:shadow-md hover:shadow-indigo-50 transition-all flex flex-col md:flex-row md:justify-between md:items-center gap-6"
                    >
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {booking.listing?.Title}
                          </h3>
                          <p className="flex items-center gap-1 text-slate-400 text-xs font-bold uppercase tracking-tighter italic">
                            <MapPin className="w-3 h-3 text-indigo-500" /> {booking.listing?.City}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-slate-300" />
                            <span>{new Date(booking.checkIn).toLocaleDateString()}</span>
                            <span className="text-slate-300">→</span>
                            <span>{new Date(booking.checkOut).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-indigo-600 font-bold">
                            <IndianRupee className="w-4 h-4" />
                            <span>{booking.totalPrice}</span>
                          </div>
                        </div>

                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            booking.status === "cancelled"
                              ? "bg-rose-50 text-rose-600"
                              : "bg-emerald-50 text-emerald-600"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      {booking.status !== "cancelled" && (
                        <button
                          onClick={() => cancelBooking(booking._id)}
                          className="flex items-center justify-center gap-2 text-sm font-bold text-rose-500 bg-rose-50 px-5 py-3 rounded-xl hover:bg-rose-500 hover:text-white transition-all active:scale-95"
                        >
                          <Trash2 className="w-4 h-4" /> Cancel Trip
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;