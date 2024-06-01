import { useState } from 'react';
import api from '../utils/api'; // axios 인스턴스

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/login', {
        email: email,
        password: password,
      });
     
      const accessToken = response.headers.authorization;
      localStorage.setItem('accessToken', accessToken);

      console.log('Login successful');
      console.log(accessToken);

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

      throw err; // 필요한 경우, 이 줄을 유지하여 호출하는 쪽에서 에러를 잡을 수 있게 합니다.
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export default useLogin;
