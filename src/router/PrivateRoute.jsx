import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuthStore();

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
