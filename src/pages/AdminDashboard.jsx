import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6 text-xl font-bold text-indigo-600">
          Admin Panel
        </div>

        <nav className="px-4 space-y-2">
          <Link className="block px-4 py-2 rounded hover:bg-indigo-50 text-gray-700" to="/admin/dashboard">
            Dashboard
          </Link>
          <Link className="block px-4 py-2 rounded hover:bg-indigo-50 text-gray-700" to="/admin/addhotel">
            Add Hotel
          </Link>
          <Link className="block px-4 py-2 rounded hover:bg-indigo-50 text-gray-700" to="/admin/mylistings">
            Manage Hotels
          </Link>
          <Link className="block px-4 py-2 rounded hover:bg-indigo-50 text-gray-700" to="/admin/bookings">
            Bookings
          </Link>
          <Link className="block px-4 py-2 rounded hover:bg-indigo-50 text-red-500" to="/login">
            Logout
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Welcome, Admin
          </p>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-sm text-gray-500">Total Hotels</p>
            <h2 className="text-3xl font-bold text-indigo-600 mt-2">24</h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-sm text-gray-500">Total Users</p>
            <h2 className="text-3xl font-bold text-green-600 mt-2">156</h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-sm text-gray-500">Total Bookings</p>
            <h2 className="text-3xl font-bold text-blue-600 mt-2">89</h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-sm text-gray-500">Revenue</p>
            <h2 className="text-3xl font-bold text-emerald-600 mt-2">
              ₹ 1,25,000
            </h2>
          </div>

        </div>

        {/* RECENT BOOKINGS TABLE */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Recent Bookings
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50 text-left text-sm text-gray-600">
                  <th className="p-3">User</th>
                  <th className="p-3">Hotel</th>
                  <th className="p-3">City</th>
                  <th className="p-3">Dates</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>

              <tbody className="text-sm">
                <tr className="border-t">
                  <td className="p-3">demo@site.com</td>
                  <td className="p-3">Hotel Sunshine</td>
                  <td className="p-3">Indore</td>
                  <td className="p-3">10 Jan – 12 Jan</td>
                  <td className="p-3">₹ 4,000</td>
                  <td className="p-3 text-green-600 font-medium">
                    Confirmed
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="p-3">demo@site.com</td>
                  <td className="p-3">Hotel Royal</td>
                  <td className="p-3">Bhopal</td>
                  <td className="p-3">15 Jan – 18 Jan</td>
                  <td className="p-3">₹ 6,500</td>
                  <td className="p-3 text-red-500 font-medium">
                    Cancelled
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
