import useAxios from '../useAxios';

const useKakaoLogin = () => {
  const { fetchData } = useAxios({
    method: 'GET',
    url: '/api/member/kakao',
    shouldFetch: false,
  });

  const kakaoLogin = async () => {
    try {
      const response = await fetchData();
      const kakaoAuthUrl = response.data;
      window.location.href = kakaoAuthUrl;
    } catch (err) {
      console.error('Error:', err);
      throw err;
    }
  };
  return { kakaoLogin };
};

export default useKakaoLogin;
