import React, { useEffect } from 'react';

const Oauth = () => {
  useEffect(() => {
    const script = document.createElement('script'); // 카카오 SDK 스크립트를 동적으로 추가합니다.
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init('7e90d9896faf841ce94bfd30af01b939'); // 카카오 SDK 초기화
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const kakaoLogin = () => {
    if (window.Kakao && window.Kakao.Auth) {
      window.Kakao.Auth.authorize({
        redirectUri: 'http://127.0.0.1:5137/oauth/kakao/callback', // 리다이렉트 URI 설정
        scope: 'profile_nickname',
      });
    } else {
      console.error('Kakao SDK not loaded yet.');
    }
  };

  return { kakaoLogin }; // kakaoLogin 함수 반환
};

export default Oauth;
