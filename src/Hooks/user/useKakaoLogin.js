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

      console.log('kakaoAuthUrl : ', response.data);

      // 새 창에서 Kakao 인증 URL 열기
      window.location.href = kakaoAuthUrl;
    } catch (err) {
      console.error('Error:', err);
      throw err; // 에러를 호출자에게 전파
    }
  };
  return { kakaoLogin };
};

export default useKakaoLogin;
