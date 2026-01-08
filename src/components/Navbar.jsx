import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendcontext } from "../context/ApiContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const [City, setCity] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔥 CONTEXT ONLY (NO localStorage)
  const {
    isLoggedIn,
    setIsLoggedIn,
    userrole,
    setUserrole,
    setUser,
    serverurl,
  } = useContext(backendcontext);

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserrole(null);

    toast.success("user logout successfullly");
    navigate("/");
    setTimeout(() => {
      window.location.reload(true);
    }, 1000);

    setMenuOpen(false);
  };

  /* ---------------- SEARCH ---------------- */
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!City.trim()) return;

    try {
      setLoading(true);

      const res = await axios.get(
        `${serverurl}/api/listings/hotelsincity`,
        { params: { city: City } }
      );

      navigate("/search", {
        state: {
          hotels: res.data.hotels,
          city: City,
        },
      });

      setCity("");
      setMenuOpen(false);
    } catch (err) {
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

          {/* HOME */}
          <Link to="/" className="nav-link font-medium">
            Home
          </Link>

          {/* SEARCH */}
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              placeholder="Search by city..."
              value={City}
              onChange={(e) => setCity(e.target.value)}
              className="border rounded-l-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-4 py-1.5 rounded-r-lg text-sm hover:bg-indigo-700"
            >
              {loading ? "..." : "Search"}
            </button>
          </form>

          {/* ROLE BASED LINK */}
          {isLoggedIn && userrole === "user" && (
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          )}

          {isLoggedIn && userrole === "admin" && (
            <Link to="/admin/dashboard" className="nav-link text-red-500">
              Dashboard
            </Link>
          )}

          {/* AUTH */}
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
              <Link to="/admin/login" className="nav-link text-red-500">
                Admin
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="nav-link text-red-500 font-medium"
            >
              Logout
            </button>
          )}
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

          <Link to="/" className="block nav-link font-medium">
            Home
          </Link>

          {/* MOBILE SEARCH */}
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Search by city..."
              value={City}
              onChange={(e) => setCity(e.target.value)}
              className="border rounded-l-lg px-3 py-2 w-full"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-4 rounded-r-lg"
            >
              Go
            </button>
          </form>

          {isLoggedIn && userrole === "user" && (
            <Link to="/profile" className="block nav-link">
              Profile
            </Link>
          )}

          {isLoggedIn && userrole === "admin" && (
            <Link
              to="/admin/dashboard"
              className="block nav-link text-red-500"
            >
              Dashboard
            </Link>
          )}

          {!isLoggedIn ? (
            <>
              <Link to="/login" className="block nav-link">
                Login
              </Link>
              <Link to="/register" className="block nav-link">
                Register
              </Link>
              <Link
                to="/admin/login"
                className="block nav-link text-red-500"
              >
                Admin Login
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="block nav-link text-left text-red-500 w-full"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
