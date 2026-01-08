import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Hotels from "./pages/Hotels";
import Booking from "./pages/Booking";
import Profile from "./pages/Profile";

import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";
import AddHotel from "./pages/AddHotel";
import AdminDashboard from "./pages/AdminDashboard";
import MyListings from "./pages/MyListings";
import EditHotel from "./pages/EditHotel";

import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<Hotels />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hotel/:id" element={<Booking />} />
        <Route path="/profile" element={<Profile />} />

        {/* ADMIN AUTH ROUTES (NOT PROTECTED) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />

        {/* ADMIN PROTECTED ROUTES */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/addhotel"
          element={
            <AdminProtectedRoute>
              <AddHotel />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/mylistings"
          element={
            <AdminProtectedRoute>
              <MyListings />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/edithotel/:id"
          element={
            <AdminProtectedRoute>
              <EditHotel />
            </AdminProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="/search" element={<SearchResults/>}/>
      </Routes>
    </div>
  );
}

export default App;
