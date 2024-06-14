import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OauthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search); // URL에서 코드 추출
    const code = urlParams.get('code');

    // if (code) {
    //   // 백엔드에서 카카오 토큰을 교환하는 API를 호출합니다.
    //   fetch(`YOUR_BACKEND_ENDPOINT?code=${code}`) // 백엔드 엔드포인트 호출
    //     .then((response) => response.json())
    //     .then((data) => {
    //       // 토큰 저장 및 사용자 정보 처리
    //       // 예: localStorage.setItem('accessToken', data.access_token);
    //       navigate('/'); // 메인 페이지로 리다이렉트
    //     })
    //     .catch((error) => {
    //       console.error('Error during Kakao login callback:', error);
    //       navigate('/'); // 에러 발생 시 메인 페이지로 리다이렉트
    //     });
    // }
  }, [navigate]);

  return <div>Loading...</div>; // 로딩 중 표시
};

export default OauthCallback;
