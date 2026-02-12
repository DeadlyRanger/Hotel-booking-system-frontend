import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { backendcontext } from "../context/ApiContext";
// Icons for a professional admin feel
import { 
  LayoutDashboard, 
  PlusSquare, 
  Hotel, 
  BookOpen, 
  LogOut, 
  Users, 
  IndianRupee, 
  TrendingUp,
  CircleUser
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ FIXED CONTEXT (Preserved logic)
  const {
    isLoggedIn,
    userrole,
    setIsLoggedIn,
    setUserrole,
  } = useContext(backendcontext);

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserrole(null);
    navigate("/login");
  };

  // Helper for active link styling
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-8 flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <LayoutDashboard className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            Admin<span className="text-indigo-600">Hub</span>
          </span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-2">Main Menu</p>
          
          <Link
            to="/admin/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
              isActive("/admin/dashboard") 
              ? "bg-indigo-50 text-indigo-700" 
              : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>

          <Link
            to="/admin/addhotel"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-indigo-600 transition-all font-medium"
          >
            <PlusSquare className="w-5 h-5" /> Add Hotel
          </Link>

          <Link
            to="/admin/mylistings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-indigo-600 transition-all font-medium"
          >
            <Hotel className="w-5 h-5" /> Manage Hotels
          </Link>

          <Link
            to="/admin/bookings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-indigo-600 transition-all font-medium"
          >
            <BookOpen className="w-5 h-5" /> Bookings
          </Link>
        </nav>

        {/* BOTTOM USER SECTION */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-rose-600 hover:bg-rose-50 transition-all font-semibold"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 font-medium">Monitoring your hotel ecosystem.</p>
          </div>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <CircleUser className="w-5 h-5 text-indigo-600" />
            </div>
            <span className="text-sm font-bold text-gray-700 italic">Welcome, Administrator</span>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Total Hotels", val: "24", icon: Hotel, color: "text-indigo-600", bg: "bg-indigo-50" },
            { label: "Total Users", val: "156", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Total Bookings", val: "89", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Revenue", val: "₹ 1,25,000", icon: IndianRupee, color: "text-amber-600", bg: "bg-amber-50" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                  <h2 className={`text-2xl font-black ${stat.color} mt-2`}>{stat.val}</h2>
                </div>
                <div className={`${stat.bg} p-2 rounded-lg`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-50 w-fit px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3 h-3" /> +12% this month
              </div>
            </div>
          ))}
        </div>

        {/* RECENT BOOKINGS TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" /> Recent Bookings
            </h2>
            <button className="text-sm font-bold text-indigo-600 hover:underline">View All</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/50 text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  <th className="px-6 py-4">User Details</th>
                  <th className="px-6 py-4">Hotel Property</th>
                  <th className="px-6 py-4">City</th>
                  <th className="px-6 py-4">Stay Duration</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50 text-sm">
                <tr className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 font-semibold text-gray-700">demo@site.com</td>
                  <td className="px-6 py-4 text-gray-600">Hotel Sunshine</td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium uppercase tracking-tighter">Indore</span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">10 Jan – 12 Jan</td>
                  <td className="px-6 py-4 font-bold text-gray-900">₹ 4,000</td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">Confirmed</span>
                  </td>
                </tr>

                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-700">demo@site.com</td>
                  <td className="px-6 py-4 text-gray-600">Hotel Royal</td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium uppercase tracking-tighter text-gray-500">Bhopal</span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">15 Jan – 18 Jan</td>
                  <td className="px-6 py-4 font-bold text-gray-900">₹ 6,500</td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-xs font-bold">Cancelled</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;