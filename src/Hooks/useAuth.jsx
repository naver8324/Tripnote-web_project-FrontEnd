import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { jwtDecode } from 'jwt-decode';

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

export const PrivateRoute = ({ isSocialOnly }) => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const token = localStorage.getItem('accessToken');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth || !token) {
      navigate('/login');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        navigate('/login');
        return;
      }

      if (isSocialOnly && decodedToken.provider !== 'kakao') {
        navigate('/login');
        return;
      }
    } catch (error) {
      console.error('Invalid token:', error);
      navigate('/login');
    }
  }, [isAuth, token, isSocialOnly, location.pathname, navigate]);

  return isAuth ? <Outlet /> : null;
};

export const PublicRoute = () => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  return !isAuth ? <Outlet /> : null;
};

export default useAuth;
