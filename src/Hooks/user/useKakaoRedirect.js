import useAxios from '../useAxios';
import useAuthStore from '../../store/useAuthStore';
import useMemberInfo from './useMemberInfo';

const useKakaoRedirect = (code) => {
  const setIsAuth = useAuthStore((state) => state.setIsAuth);
  const { fetchData, error, loading } = useAxios({
    method: 'GET',
    url: `api/member/kakao/login?code=${code}`,
    shouldFetch: false,
  });
  const { memberInfo } = useMemberInfo();

  const kakaoRedirect = async () => {
    try {
      const response = await fetchData();

      const accessToken = response.data.jwtToken;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('provider', 'kakao');

      setIsAuth(true);
      await memberInfo(); // 이메일과 닉네임을 로컬 스토리지에 저장

      return accessToken;
    } catch (err) {
      console.error('Error:', err);
      throw err;
    }
  };

  return { kakaoRedirect, loading, error };
};

export default useKakaoRedirect;
