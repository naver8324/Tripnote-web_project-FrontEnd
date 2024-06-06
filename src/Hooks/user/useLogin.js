import useAxios from '../useAxios';
import useAuthStore from '../../store/useAuthStore';

const useLogin = () => {
  const setIsAuth = useAuthStore((state) => state.setIsAuth);
  const { fetchData, error, loading } = useAxios({
    method: 'POST',
    url: '/login',
    shouldFetch: false,
  });

  const login = async (email, password) => {
    try {
      const response = await fetchData({ data: { email, password } });

      const accessToken = response.headers.authorization.split(' ')[1];
      localStorage.setItem('accessToken', accessToken);

      console.log('Login successful');
      console.log(accessToken);

      setIsAuth(true); // Zustand 상태 업데이트

      return accessToken;
    } catch (err) {
      console.error('Error:', err);
      throw err; // 에러를 호출자에게 전파
    }
  };

  return { login, loading, error };
};

export default useLogin;
