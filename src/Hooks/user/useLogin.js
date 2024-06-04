import { useState } from 'react';
import useAxios from '../useAxios';
import useAuthStore from '../../store/useAuthStore';

const useLogin = () => {
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { fetchData } = useAxios({
    method: 'POST',
    url: '/login',
    shouldFetch: false,
  });

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchData({ data: { email, password } });
      console.log('response', response)

      const accessToken = response.headers.authorization;
      localStorage.setItem('accessToken', accessToken);

      console.log('Login successful');
      console.log(accessToken);

      setIsLoggedIn(true); // Zustand 상태 업데이트

      return accessToken;
    } catch (err) {
      console.error('Error:', err);

      if (err.response) {
        const { status, data } = err.response;
        setError({ message: err.message, status, data });
      } else if (err.request) {
        setError({ message: '응답이 없습니다', request: err.request });
      } else {
        setError({ message: '오류가 발생했습니다', error: err.message });
      }

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export default useLogin;