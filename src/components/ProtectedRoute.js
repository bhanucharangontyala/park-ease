import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getDefaultRouteForUser, getStoredUser } from '../utils/auth';

const ProtectedRoute = ({ allowedRoles }) => {
  const user = getStoredUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={getDefaultRouteForUser(user)} replace />;
  }

  return <Outlet />;
};

export const PublicOnlyRoute = () => {
  const user = getStoredUser();

  if (user) {
    return <Navigate to={getDefaultRouteForUser(user)} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
