import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, element: Component }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check for admin-specific routes
  if (isAdmin && user?.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render the requested component if all checks pass
  return Component;
};

export default ProtectedRoute;
