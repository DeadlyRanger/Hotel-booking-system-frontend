import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hoteldata, setHotelData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookingLoading, setBookingLoading] = useState(false);

  /* ---------------- FETCH HOTEL ---------------- */
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/listings/hotels/${id}`
        );
        setHotelData(res.data.hotel);
      } catch (err) {
        console.log("HOTEL FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

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
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/user/logout",
        {},
        { withCredentials: true }
      );
      navigate("/login");
    } catch (err) {
      alert("Logout failed");
    }
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
        `http://localhost:3000/api/listing/bookings/${id}`,
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
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading hotel details...
      </div>
    );
  }

  if (!hoteldata) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Hotel not found
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-slate-100 px-4 sm:px-6 py-8">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Booking Details</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-red-500 border border-red-500 px-4 py-1.5 rounded hover:bg-red-500 hover:text-white transition"
        >
          Logout
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* HOTEL INFO */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow overflow-hidden">
          <img
            src={hoteldata.Image}
            alt={hoteldata.Title}
            className="w-full h-72 sm:h-80 object-cover"
          />

          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">{hoteldata.Title}</h2>

            <p className="text-gray-500">
              📍 {hoteldata.Address}, {hoteldata.City}
            </p>

            <p className="text-gray-700 leading-relaxed">
              {hoteldata.Description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
              <p>📞 Contact: {hoteldata.Contact}</p>
              <p>🏙 City: {hoteldata.City}</p>
            </div>
          </div>
        </div>

        {/* BOOKING CARD */}
        <div className="bg-white rounded-xl shadow p-6 h-fit lg:sticky lg:top-24">
          <p className="text-2xl font-bold text-indigo-600">
            ₹ {hoteldata.price}
            <span className="text-sm text-gray-500"> / night</span>
          </p>

          <div className="mt-5 space-y-3">
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="date"
              min={checkIn}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {totalPrice > 0 && (
              <div className="bg-indigo-50 p-3 rounded text-indigo-700 font-semibold">
                Total Price: ₹ {totalPrice}
              </div>
            )}

            <button
              onClick={handleBooking}
              disabled={bookingLoading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
            >
              {bookingLoading ? "Booking..." : "Book Now"}
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-3 text-center">
            You won’t be charged yet
          </p>
        </div>
      </div>
    </div>
  );
};

export default Booking;
