import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
  const location = useLocation();
  const { isAuth, setIsAuth, logout } = useAuthStore();

  const getAuthStatus = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          // 토큰이 만료된 경우 로그아웃
          logout();
        } else {
          setIsAuth(true);
        }
      } catch (error) {
        console.error('Invalid token:', error);
        logout();
      }
    } else {
      setIsAuth(false);
    }
  };

  useEffect(() => {
    getAuthStatus();
  }, [location.pathname]);

  return {
    isAuth,
    logout,
  };
};

export default useAuth;
