import React from 'react';

const Oauth = () => {
  const kakaoLogin = () => {
    const clientId = 'adf026fc50031769a1d948578419e6b3';
    const redirectUri = encodeURIComponent(
      'http://34.64.39.102:8080/api/member/kakao/callback',
    ); // 백엔드에서 처리할 콜백 URI로 설정
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

    window.location.href = kakaoAuthUrl;
  };

  return (
    <div>
      <button onClick={kakaoLogin}>카카오 로그인</button>
    </div>
  );
};

export default Oauth;
