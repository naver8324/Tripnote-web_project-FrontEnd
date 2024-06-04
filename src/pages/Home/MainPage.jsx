import React, { useEffect, useRef } from 'react';
import mainImg from '../../assets/travel.jpg';
import elicelogo from '../../assets/elicelogo.png';
import seoul from '../../assets/seoul.jpg';
import suwon from '../../assets/suwon.jpg';
import busan from '../../assets/busan.jpg';
import daejeon from '../../assets/daejeon.jpg';
import './MainPage.css';
import { GoSearch } from 'react-icons/go';
import ImageCard from '../../components/Home/ImageCard';
import useStore from '../../store/store';
import Button from '../../components/commons/Button';
import Input from '../../components/commons/Input';

const regions = [
  { imgSrc: seoul, name: '서울' },
  { imgSrc: suwon, name: '수원' },
  { imgSrc: busan, name: '부산' },
  { imgSrc: daejeon, name: '대전' },
];

export default function MainPage() {
  const searchRef = useRef();
  const searchQuery = useStore((state) => state.searchQuery);

  const setScrollSmooth = () => {
    if (searchRef) {
      searchRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (searchQuery) {
      setScrollSmooth();
    }
  }, [searchQuery]);

  const handleButtonClick = () => {
    setScrollSmooth();
  };

  return (
    <div className="outer">
      <div className="inner relative">
        <img
          src={mainImg}
          alt="main image"
          className="h-screen w-full object-cover"
        />
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-5xl tracking-wide text-center">
          당일 여행 계획은
          <br /> 트립 노트에서!
        </p>
      </div>
      <div className="inner gap-32 tracking-wider">
        <div className="text-3xl font-semibold flex flex-col gap-20">
          즉흥적인 여행을 위한
          <br /> 빠른 여행 플래너
          <div className="flex justify-start">
            <Button
              onClick={handleButtonClick}
              variant="roundButton"
              size="large"
              className="bg-white hover:bg-prime text-title hover:text-white text-lg font-semibold px-6 py-2 rounded-full border-2 border-grey-300 hover:border-prime transition-all duration-300"
            >
              경로 추천
            </Button>
          </div>
        </div>
        <div className="">
          <img
            src="https://blog.kakaocdn.net/dn/btCi15/btsdlrcp0jU/MWKagCKTeNvkzkP0j7auHk/img.gif"
            alt="임시 피카츄 gif"
          />
        </div>
      </div>
      <div id="search" ref={searchRef} className="inner flex flex-col gap-8">
        <form className="relative mt-4 flex">
          <Input variant="searchInput" placeholder="여행지를 검색해보세요!" />
        </form>
        <p className="text-title text-xl font-semibold mt-4">
          지금 뜨는 여행지
        </p>
        <div className="flex gap-4">
          {regions.map((region, index) => (
            <ImageCard key={index} imgSrc={region.imgSrc}>
              <h1 className="text-xl font-medium ">{region.name}</h1>
            </ImageCard>
          ))}
        </div>
      </div>
      <div className="h-96 flex flex-col justify-center items-center gap-16">
        <h1 className="text-title text-3xl font-semibold">PARTNERS</h1>
        <img src={elicelogo} alt="elice logo" className="w-40" />
      </div>
    </div>
  );
}
