import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import usePasswordCheckStore from '../store/usePasswordCheckStore';
import jwtDecode from 'jwt-decode';

export const PrivateRoute = ({ isSocialOnly }) => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const isPasswordChecked = usePasswordCheckStore(
    (state) => state.isPasswordChecked,
  );
  const token = localStorage.getItem('accessToken');
  const location = useLocation();

  if (!isAuth || !token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      return <Navigate to="/login" />;
    }

    if (isSocialOnly && decodedToken.provider !== 'kakao') {
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.error('Invalid token:', error);
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export const PublicRoute = () => {
  const isAuth = useAuthStore((state) => state.isAuth);

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
