import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore'; // Zustand store import

const privatePaths = ['/mypage', '/mypage/profile'];
const publicPaths = ['/login', '/signup', '/agree'];

const useAuth = () => {
  const location = useLocation();
  const [isAuth, setIsAuth] = useState(false);
  const { setIsLoggedIn } = useAuthStore();

  const getAuthStatus = async () => {
    const isTokenExist = !!localStorage.getItem('accessToken');
    setIsAuth(isTokenExist);
    setIsLoggedIn(isTokenExist); // Zustand store에 인증 상태 기록
  };

  useEffect(() => {
    getAuthStatus();
  }, []);

  useEffect(() => {
    if (privatePaths.includes(location.pathname)) {
      getAuthStatus();
    }
  }, [location.pathname]);

  return {
    isAuth,
    privatePaths,
    publicPaths,
  };
};

export default useAuth;
