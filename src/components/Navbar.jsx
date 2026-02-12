import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendcontext } from "../context/ApiContext";
import toast from "react-hot-toast";

import { Search, Menu, X, User, LogOut, LayoutDashboard, MapPin } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [City, setCity] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:bg-indigo-700 transition-colors">
              <MapPin className="text-white w-5 h-5" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-gray-900">
              Stay<span className="text-indigo-600">Ease</span>
            </span>
          </Link>

          {/* DESKTOP SEARCH BAR */}
          <div className="hidden lg:flex flex-1 justify-center px-8">
            <form onSubmit={handleSearch} className="relative w-full max-w-md group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400 group-focus-within:text-indigo-500" />
              </div>
              <input
                type="text"
                placeholder="Search by city..."
                value={City}
                onChange={(e) => setCity(e.target.value)}
                className="block w-full pl-10 pr-24 py-2 border border-gray-200 rounded-full bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-indigo-600 text-white px-4 rounded-full text-xs font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {loading ? "..." : "Search"}
              </button>
            </form>
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
              Home
            </Link>

            {isLoggedIn && userrole === "user" && (
              <Link to="/profile" className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
                <User className="w-4 h-4" /> Profile
              </Link>
            )}

            {isLoggedIn && userrole === "admin" && (
              <Link to="/admin/dashboard" className="flex items-center gap-1 text-sm font-medium text-rose-600 hover:text-rose-700 transition-colors">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
            )}

            <div className="h-6  bg-gray-200 mx-2"></div>

            {!isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-semibold text-gray-700 hover:text-indigo-600">
                  Login
                </Link>
                <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-shadow hover:shadow-lg">
                  Register
                </Link>
                <Link to="/admin/login" className="text-xs font-bold text-rose-500 uppercase tracking-wider hover:text-rose-600">
                  Admin
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm font-semibold text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-4 pb-6 space-y-4">
            
            {/* MOBILE SEARCH */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search by city..."
                value={City}
                onChange={(e) => setCity(e.target.value)}
                className="w-full pl-4 pr-12 py-3 bg-gray-100 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-2 top-2 bottom-2 bg-indigo-600 text-white px-3 rounded-lg"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            <div className="grid grid-cols-1 gap-2">
              <Link to="/" onClick={() => setMenuOpen(false)} className="px-3 py-2 text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg">
                Home
              </Link>

              {isLoggedIn && userrole === "user" && (
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="px-3 py-2 text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg">
                  My Profile
                </Link>
              )}

              {isLoggedIn && userrole === "admin" && (
                <Link to="/admin/dashboard" onClick={() => setMenuOpen(false)} className="px-3 py-2 text-base font-medium text-rose-600 hover:bg-rose-50 rounded-lg">
                  Admin Dashboard
                </Link>
              )}

              <hr className="my-2 border-gray-100" />

              {!isLoggedIn ? (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="px-3 py-2 text-base font-medium text-gray-700 hover:bg-indigo-50 rounded-lg">
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)} className="px-3 py-2 text-base font-medium text-indigo-600 bg-indigo-50 rounded-lg text-center">
                    Create Account
                  </Link>
                  <Link to="/admin/login" onClick={() => setMenuOpen(false)} className="px-3 py-2 text-center text-sm font-bold text-rose-500 border border-rose-100 rounded-lg">
                    Admin Login
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-base font-medium text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5" /> Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;