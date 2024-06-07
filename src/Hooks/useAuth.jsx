import React, { useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const useAuth = () => {
  const location = useLocation();
  const { isAuth, setIsAuth, logout } = useAuthStore();

  const getAuthStatus = () => {
    const token = localStorage.getItem('accessToken');
    setIsAuth(!!token);
  };

  useEffect(() => {
    getAuthStatus();
  }, [location.pathname]);

  return {
    isAuth,
    logout,
  };
};

export const PrivateRoute = () => {
  const { isAuth } = useAuth();

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export const PublicRoute = () => {
  const { isAuth } = useAuth();

  return isAuth ? <Navigate to="/" /> : <Outlet />;
};

export default useAuth;
