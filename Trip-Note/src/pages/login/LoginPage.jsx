import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/logo-green.png';
import kakao from '../../assets/kakao.png';
import naver from '../../assets/naver.png';
import google from '../../assets/google.png';
import GhostButton from '../../components/commons/GhostButton';
import InfoInput from '../../components/commons/InfoInput';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleFindPasswordClick = () => {
    navigate('/findPassword');
  };

  const handleSignupClick = () => {
    navigate('/agree');
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
        <InfoInput title="이메일" type="email" />
        <InfoInput title="비밀번호" type="password" className="mb-2" />

        <p
          className="text-xs text-right text-prime cursor-pointer mb-8"
          onClick={handleFindPasswordClick}
        >
          비밀번호를 잊으셨나요?
        </p>
        <GhostButton title="로그인" />
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
          <Link to="/">
            <img
              className="w-14 h-auto rounded-lg "
              src={kakao}
              alt="trip note logo"
            />
          </Link>
          <Link to="/">
            <img
              className="w-14 h-auto rounded-lg"
              src={naver}
              alt="trip note logo"
            />
          </Link>
          <Link to="/">
            <img
              className="w-14 h-auto rounded-lg shadow"
              src={google}
              alt="trip note logo"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
