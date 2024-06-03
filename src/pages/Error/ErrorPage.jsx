import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo-green.png';
import { Link, useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    if(count === 0) {
      navigate('/')
    }

    return () => clearTimeout(timer);
  }, [count, navigate]);

  return (
    <section className="flex flex-col items-center mt-40 gap-8 text-center">
      <img src={logo} alt="tripnote logo" className="w-72 flex" />
      <h1 className="text-2xl">요청하신 페이지를 찾을 수 없습니다.🤣</h1>
      <p className="text-xl">
        서비스 이용에 불편을 드려 죄송합니다.
        <br /> {count}초 후{' '}
        <Link to="/" className="text-prime ">
          메인페이지
        </Link>
        로 이동합니다.
      </p>
    </section>
  );
}
