import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendcontext } from "../context/ApiContext";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH PROFILE ---------------- */
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/user/profile",
        { withCredentials: true }
      );
      setUser(res.data.user);
    } catch (err) {
      console.log("PROFILE ERROR:", err.response?.data);
    }
  };

  let {serverurl,userrole,setUserrole} =  useContext(backendcontext)

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
    if (!window.confirm("Cancel this booking?")) return;

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
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Please login to view profile
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-slate-100 px-4 sm:px-6 py-8">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold">My Profile</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-red-500 border border-red-500 px-4 py-1.5 rounded hover:bg-red-500 hover:text-white transition"
        >
          Logout
        </button>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">

        {/* USER INFO CARD */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-3">Account Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <p>
              <span className="font-medium">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
          </div>
        </div>

        {/* BOOKINGS */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">My Bookings</h2>

          {bookings.length === 0 ? (
            <p className="text-gray-500">No bookings found</p>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="border rounded-lg p-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4"
                >
                  {/* BOOKING INFO */}
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">
                      {booking.listing?.Title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {booking.listing?.City}
                    </p>

                    <p className="text-sm">
                      {new Date(booking.checkIn).toDateString()} →{" "}
                      {new Date(booking.checkOut).toDateString()}
                    </p>

                    <p className="text-sm font-medium">
                      Total: ₹{booking.totalPrice}
                    </p>

                    <span
                      className={`inline-block text-xs px-2 py-1 rounded-full ${
                        booking.status === "cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  {/* ACTION */}
                  {booking.status !== "cancelled" && (
                    <button
                      onClick={() => cancelBooking(booking._id)}
                      className="text-sm text-red-500 border border-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-white transition self-start md:self-center"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;
