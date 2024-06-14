import useAxios from '../useAxios';

const useKakaoLogin = () => {
  const { fetchData } = useAxios({
    method: 'GET',
    url: '/api/member/kakao',
    shouldFetch: false,
  });

  const kakaoLogin = async (redirectUrl) => {
    try {
      const response = await fetchData({
        params: { redirecturl: redirectUrl },
      });
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
