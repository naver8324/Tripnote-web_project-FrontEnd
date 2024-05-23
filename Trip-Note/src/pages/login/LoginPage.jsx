import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/logo-green.png';
import kakao from '../../assets/kakao.png';
import naver from '../../assets/naver.png';
import google from '../../assets/google.png';

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
      <div className="w-[640px] m-32 p-16">
        <Link
          to="/"
          className="flex flex-col items-center justify-center text-l mb-12"
        >
          <img className="w-52 h-auto mr-2" src={logo} alt="trip note logo" />
          <p className="text-lg">여행 경로 정할 땐, 트립 노트</p>
        </Link>
        <p className="text-subTitle">이메일</p>
        <input
          type="email"
          className="w-full h-14 mb-4 p-2 border border-gray-300 rounded-lg"
        />

        <p className="text-subTitle">비밀번호</p>
        <input
          type="password"
          className="w-full h-14 mb-1 p-2 border border-gray-300 rounded-lg"
        />
        <p
          className="text-xs text-right text-prime cursor-pointer mb-8"
          onClick={handleFindPasswordClick}
        >
          비밀번호를 잊으셨나요?
        </p>
        <button className="text-lg w-full h-14 bg-prime text-white p-2 rounded-lg mb-5">
          로그인
        </button>
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
