import { useState } from 'react';
import useAuthStore from '../../store/useAuthStore';

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setIsAuth } = useAuthStore();

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      // 로컬 스토리지에서 어세스 토큰 제거
      localStorage.removeItem('accessToken');

      console.log('Logout successful');
      setIsAuth(false);
      return true;
    } catch (err) {
      console.error('Error:', err);

      setError({
        message: '로그아웃 중 오류가 발생했습니다',
        error: err.message,
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading, error };
};

export default useLogout;
