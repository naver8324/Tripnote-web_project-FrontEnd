import React, { useRef } from 'react';
import logo from '../../assets/logo-green.png';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../../store/store';
import Button from '../commons/Button';

export default function Header() {
  const setSearchQuery = useStore((state) => state.setSearchQuery);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/agree');
  };

  const handleSearchClick = () => {
    setSearchQuery('');
    navigate('/');

    const searchElement = document.getElementById('search');
    if (searchElement) {
      searchElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white text-title py-10 px-20 border-b border-grey-300 fixed z-50 top-0 left-0 w-full">
      <div className="flex justify-between">
        <Link to="/" className="flex items-center text-l">
          <img className="w-36 h-auto" src={logo} alt="trip note logo" />
        </Link>
        <nav className="flex items-center gap-4 font-medium">
          {/* @Todo : Link constans로 뺄 예정 */}
          <Link
            onClick={handleSearchClick}
            className=" hover:text-prime"
            to="/root/recommend"
          >
            경로 검색
          </Link>
          <Link className=" hover:text-prime" to="/root/create">
            경로 생성
          </Link>
          <Link className=" hover:text-prime" to="/mypage">
            마이페이지
          </Link>
          <Link className=" hover:text-prime" to="/board">
            후기
          </Link>
          <div className='space-x-2'>
          <Button onClick={handleLoginClick} className="border-grey-300">
            로그인
          </Button>
          <Button
            onClick={handleSignupClick}
            className="border-grey-300 bg-red-400 text-white"
          >
            회원가입
          </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
