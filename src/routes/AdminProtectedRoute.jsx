import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { backendcontext } from '../context/ApiContext';
import toast from "react-hot-toast";

const AdminProtectedRoute = ({ children }) => {
  const { userrole } = useContext(backendcontext);

  // ❌ if user is not admin
  if (userrole !== "admin") {
toast.error(' Access Denied ! Admin Only ')
    return <Navigate to="/" replace />;
  }

  // ✅ if admin
  return children;
};

export default AdminProtectedRoute;
