import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [City, setCity] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ---------------- SEARCH HANDLER ---------------- */
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!City.trim()) return;

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/api/listing/hotels",
        { City }
      );

      // redirect to search page with data
      navigate("/search", {
        state: {
          hotels: res.data.hotels,
          City
        }
      });

      setCity("");
      setMenuOpen(false);
    } catch (err) {
      console.log("SEARCH ERROR:", err.response?.data);
      alert("No hotels found for this city");
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          StayEase
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
          <Link to="/admin/login" className="nav-link text-red-500">
            Admin
          </Link>

          {/* SEARCH BAR */}
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Search by city..."
              value={City}
              onChange={(e) => setCity(e.target.value)}
              className="border rounded-l-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-4 rounded-r-lg hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? "..." : "Search"}
            </button>
          </form>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 pb-4 space-y-3">
          <Link to="/" className="block nav-link" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/profile" className="block nav-link" onClick={() => setMenuOpen(false)}>
            Profile
          </Link>
          <Link to="/login" className="block nav-link" onClick={() => setMenuOpen(false)}>
            Login
          </Link>
          <Link to="/register" className="block nav-link" onClick={() => setMenuOpen(false)}>
            Register
          </Link>
          <Link
            to="/admin/login"
            className="block nav-link text-red-500"
            onClick={() => setMenuOpen(false)}
          >
            Admin Login
          </Link>

          {/* MOBILE SEARCH */}
          <form onSubmit={handleSearch} className="flex mt-2">
            <input
              type="text"
              placeholder="Search by city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border rounded-l-lg px-3 py-2 w-full focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-4 rounded-r-lg disabled:opacity-60"
            >
              Go
            </button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
