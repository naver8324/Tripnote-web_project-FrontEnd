import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import usePasswordCheckStore from '../store/usePasswordCheckStore';
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
  const isPasswordChecked = usePasswordCheckStore(
    (state) => state.isPasswordChecked,
  );
  const token = localStorage.getItem('accessToken');
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAuth || !token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      navigate('/login');
    }

    if (isSocialOnly && decodedToken.provider !== 'kakao') {
      navigate('/login');
    }

    if (location.pathname === '/mypage/profile' && !isPasswordChecked) {
      navigate('/mypage/checkedpassword');
    }
  } catch (error) {
    console.error('Invalid token:', error);
    navigate('/login');
  }

  return <Outlet />;
};

export const PublicRoute = () => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const navigate = useNavigate();

  if (isAuth) {
    navigate('/');
  }

  return <Outlet />;
};
export default useAuth;
