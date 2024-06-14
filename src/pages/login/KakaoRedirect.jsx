import { useEffect } from 'react';
import Spinner from '../../components/commons/Spinner.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import useKakaoRedirect from '../../Hooks/user/useKakaoRedirect.js';

export default function KakaoRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  const code = new URL(window.location.href).searchParams.get('code');
  const redirectUrl =
    new URLSearchParams(location.search).get('redirecturl') || '/';
  const { kakaoRedirect } = useKakaoRedirect(code);

  const handleKakaoRedirect = async () => {
    try {
      await kakaoRedirect();
      navigate(redirectUrl);
    } catch (err) {
      console.error('kakao redirect error: ', err);
    }
  };

  useEffect(() => {
    if (code) {
      handleKakaoRedirect();
    }
  }, [code]); // 의존성 배열에 code를 추가

  return <Spinner />;
}
