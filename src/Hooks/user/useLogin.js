import useAxios from '../useAxios';
import useAuthStore from '../../store/useAuthStore';
import useUserStore from '../../store/useUserStore';
import useMemberInfo from './useMemberInfo';
import useCreateRoute from '../../Hooks/routes/useCreateRoute';
import { ToastAlert } from '../../components/commons/ToastAlert';

const useLogin = () => {
  const setIsAuth = useAuthStore((state) => state.setIsAuth);
  const { fetchData, error, loading } = useAxios({
    method: 'POST',
    url: '/login',
    shouldFetch: false,
  });
  const { createRoute } = useCreateRoute();
  const { memberInfo } = useMemberInfo();

  const login = async (email, password) => {
    const routeData = localStorage.getItem('routeData');

    try {
      const response = await fetchData({ data: { email, password } });

      const accessToken = response.headers.authorization.split(' ')[1];
      localStorage.setItem('accessToken', accessToken);

      setIsAuth(true); // Zustand 상태 업데이트

      await memberInfo(); // 이메일과 닉네임을 로컬 스토리지에 저장

      if (routeData) {
        try {
          await createRoute(JSON.parse(routeData));
          localStorage.removeItem('routeData');
          ToastAlert(
            '기존에 작성하신 경로가 마이페이지에 있습니다 확인해보세요!',
            'success',
          );
        } catch (error) {
          console.error('경로 저장 중 오류가 발생했습니다:', error);
        }
      }

      return accessToken;
    } catch (err) {
      console.error('Error:', err);
      throw err; // 에러를 호출자에게 전파
    }
  };

  return { login, loading, error };
};

export default useLogin;
