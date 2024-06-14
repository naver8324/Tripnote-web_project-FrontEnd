import { useState } from 'react';
import useAxios from '../useAxios';
import useAuthStore from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setIsAuth } = useAuthStore();
  const { fetchData } = useAxios({
    method: 'POST',
    url: '/api/member/logout',
    shouldFetch: false,
  });
  const navigate = useNavigate();

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchData();

      if (response.status === 200) {
      } else {
        console.error('Logout failed:', response.data);
        setError({
          message: '로그아웃에 실패했습니다',
          error: response.data,
        });
      }
    } catch (err) {
      console.error('Error:', err);
      setError({
        message: '로그아웃 중 오류가 발생했습니다',
        error: err.message,
      });
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userNickname');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('provider');

      setIsAuth(false);
      setLoading(false);
      navigate('/');
    }
  };

  return { logout, loading, error };
};

export default useLogout;
