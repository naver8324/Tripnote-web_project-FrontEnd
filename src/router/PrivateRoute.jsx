import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import usePasswordCheckStore from '../store/usePasswordCheckStore';
import jwtDecode from 'jwt-decode';
import useMemberInfo from '../Hooks/user/useMemberInfo';

export const PrivateRoute = ({ isSocialOnly }) => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const isPasswordChecked = usePasswordCheckStore(
    (state) => state.isPasswordChecked,
  );
  const token = localStorage.getItem('accessToken');
  const location = useLocation();
  const { memberInfo } = useMemberInfo();
  const [isValidUser, setIsValidUser] = useState(null);

  useEffect(() => {
    const validateUser = async () => {
      try {
        if (token) {
          await memberInfo();
          setIsValidUser(true);
        } else {
          setIsValidUser(false);
        }
      } catch (error) {
        setIsValidUser(false);
      }
    };

    if (isAuth && token) {
      validateUser();
    } else {
      setIsValidUser(false);
    }
  }, [isAuth, token, memberInfo]);

  if (isValidUser === null) {
    return <div>Loading...</div>;
  }

  if (!isValidUser) {
    return <Navigate to="/login" />;
  }

  if (isSocialOnly && token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.provider !== 'kakao') {
      return <Navigate to="/login" />;
    }
  }

  if (location.pathname === '/mypage/profile' && !isPasswordChecked) {
    return <Navigate to="/mypage/checkedpassword" />;
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
