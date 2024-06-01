import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore'; // 상태 관리 훅 가져오기

const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useAuthStore();

  return !isLoggedIn ? children : <Navigate to="/" />;
};

export default PublicRoute;
