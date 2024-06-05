import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuthStore();

  //return isLoggedIn ? children : <Navigate to="/login" />;
  const location = useLocation();

  const isAdminRoute = location.pathname.includes('/admin');
  const redirectPath = isAdminRoute ? '/admin/login' : '/login';

  return isLoggedIn ? children : <Navigate to={redirectPath} />;
};

export default PrivateRoute;
