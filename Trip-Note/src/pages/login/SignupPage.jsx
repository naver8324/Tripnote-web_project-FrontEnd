import React from 'react';
import { Link } from 'react-router-dom';

export default function SignupPage() {
  return (
    <div className="m-56 w-[480px]">
      <div className="">
        <p className="text-3xl mb-8">회원가입</p>
        <label htmlFor="email" className="text-subTitle block mb-1">
          이메일
        </label>
        <div className="mb-6 flex justify-between items-center">
          <div className="w-3/4 mr-2">
            <input
              id="email"
              type="email"
              className="w-full h-14 p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button className="w-1/4 h-14 bg-prime text-white p-2 rounded-lg">
            인증
          </button>
        </div>
        <label htmlFor="nickname" className="text-subTitle block mb-1">
          닉네임
        </label>
        <div className="mb-6 flex justify-between items-center">
          <div className="w-3/4 mr-2">
            <input
              id="nickname"
              type="text"
              className="w-full h-14 p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button className="w-1/4 h-14 bg-prime text-white p-2 rounded-lg">
            확인
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="text-subTitle block mb-1">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            className="w-full h-14 p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-16">
          <label htmlFor="confirmPassword" className="text-subTitle block mb-1">
            비밀번호 확인
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="w-full h-14 p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button className="text-lg w-full h-14 bg-prime text-white p-2 rounded-lg mb-5">
          가입하기
        </button>
        <div className="text-center">
          <Link
            to="/login"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            로그인 화면으로 가기
          </Link>
        </div>
      </div>
    </div>
  );
}
