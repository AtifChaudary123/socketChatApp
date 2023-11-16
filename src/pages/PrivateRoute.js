import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ element, ...props }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Route element={element} {...props} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;