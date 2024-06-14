import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../useAxios';

const KakaoCallback = () => {
  const navigate = useNavigate();
  const { fetchData } = useAxios({
    method: 'GET',
    url: '', // 기본 URL을 비워둡니다
    showBoundary: true,
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      const sendAuthCode = async () => {
        try {
          const dynamicUrl = `/api/member/kakao/login?code=${code}`; // 동적 URL 생성
          const response = await fetchData({}, dynamicUrl, 'GET');
          const data = response.data;

          localStorage.setItem('accessToken', data.access_token); // 액세스 토큰을 로컬 스토리지에 저장
          navigate('/dashboard'); // 로그인 성공 후 리다이렉트할 경로
        } catch (error) {
          console.error('Error sending auth code:', error);
          navigate('/'); // 에러 발생 시 메인 페이지로 리다이렉트
        }
      };

      sendAuthCode();
    } else {
      console.error('Authorization code not found.');
      navigate('/'); // 코드가 없는 경우 메인 페이지로 리다이렉트
    }
  }, [fetchData, navigate]);

  return <div>Loading...</div>; // 로딩 중 표시
};

export default KakaoCallback;
