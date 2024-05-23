import React from 'react';
import logo from '../../assets/logo-green.png';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="flex justify-between text-title py-10 px-20 border-b border-grey-300 ">
      <Link to="/" className="flex items-center text-l">
        <img className="w-36 h-auto" src={logo} alt="trip note logo" />
      </Link>
      <nav className="flex items-center gap-4 font-medium">
        <Link className=" hover:text-prime" to="root/recommend">
          경로 검색
        </Link>
        <Link className=" hover:text-prime" to="root/create">
          경로 생성
        </Link>
        <Link className=" hover:text-prime" to="/mypage">
          마이페이지
        </Link>
        <Link className=" hover:text-prime" to="board">
          후기
        </Link>
        <button className="border border-grey-300 p-1 rounded">로그인</button>
        <button className="border border-grey-300 p-1 rounded bg-red-400 text-white">
          회원가입
        </button>
      </nav>
    </header>
  );
}
