import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import useLogin from '../../Hooks/user/useLogin';
import logo from '../../assets/logo-green.png';
import kakao from '../../assets/kakao.png';
import GhostButton from '../../components/commons/GhostButton';
import InfoInput from '../../components/commons/InfoInput';
import { ToastAlert } from '../../components/commons/ToastAlert';
import useKakaoLogin from './../../Hooks/user/useKakaoLogin';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading: loginLoading, error: loginError } = useLogin();
  const { kakaoLogin } = useKakaoLogin();

  const redirectUrl =
    new URLSearchParams(location.search).get('redirecturl') || '/';

  const handleFindPasswordClick = () => {
    navigate('/findPassword');
  };

  const handleSignupClick = () => {
    navigate(`/agree?redirecturl=${redirectUrl}`);
  };

  const handleLoginClick = async () => {
    try {
      await login(email, password);
      ToastAlert('로그인 되었습니다.', 'success');

      navigate(redirectUrl);
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleKakaoLoginClick = async () => {
    try {
      await kakaoLogin(redirectUrl); // redirectUrl을 전달합니다.
    } catch (err) {}
  };

  return (
    <div className="">
      <div className="w-[640px] m-40 p-16">
        <Link
          to="/"
          className="flex flex-col items-center justify-center text-l mb-12"
        >
          <img className="w-52 h-auto mr-2" src={logo} alt="trip note logo" />
          <p className="text-lg">여행 경로 정할 땐, 트립 노트</p>
        </Link>
        <InfoInput
          title="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InfoInput
          title="비밀번호"
          type="password"
          className="mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {loginError && <p className="text-red-500">로그인에 실패하였습니다.</p>}
        {loginLoading && <p>로그인 중...</p>}

        <p
          className="text-xs text-right text-prime cursor-pointer mb-8"
          onClick={handleFindPasswordClick}
        >
          비밀번호를 잊으셨나요?
        </p>
        <GhostButton title="로그인" onClick={handleLoginClick} />
        <p className="text-subTitle text-xs text-center mb-12">
          아직 회원이 아니세요?{' '}
          <span
            className="text-prime cursor-pointer"
            onClick={handleSignupClick}
          >
            회원가입
          </span>
        </p>

        <p className="text-lg text-subTitle flex justify-center mb-8">
          SNS간편 로그인
        </p>
        <div className="flex justify-center space-x-12">
          <Link onClick={handleKakaoLoginClick}>
            <img
              className="w-14 h-auto rounded-lg"
              src={kakao}
              alt="kakao login"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
