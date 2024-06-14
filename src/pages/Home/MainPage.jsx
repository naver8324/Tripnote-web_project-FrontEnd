import React, { useEffect, useRef } from 'react';
import mainImg from '../../assets/travel.jpg';
import elicelogo from '../../assets/elicelogo.png';
import seoul from '../../assets/seoul.jpg';
import suwon from '../../assets/suwon.jpg';
import busan from '../../assets/busan.jpg';
import daejeon from '../../assets/daejeon.jpg';
import './MainPage.css';
import ImageCard from '../../components/Home/ImageCard';
import useStore from '../../store/store';
import Button from '../../components/commons/Button';
import Selector from '../../components/Home/Selector';
import { ToastAlert } from '../../components/commons/ToastAlert';
import useRegionSearchStore from '../../store/useRegionSearchStore'; // 추가
import mainGif from '../../assets/maingif.gif';

const regions = [
  { imgSrc: seoul, name: '서울' },
  { imgSrc: suwon, name: '경기' },
  { imgSrc: busan, name: '부산' },
  { imgSrc: daejeon, name: '대전' },
];

export default function MainPage() {
  const searchRef = useRef();
  const searchQuery = useStore((state) => state.searchQuery);
  const { redirectPath, setRedirectPath } = useRegionSearchStore(); // 추가

  const setScrollSmooth = () => {
    if (searchRef.current) {
      searchRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (searchQuery) {
      setScrollSmooth();
    }
  }, [searchQuery]);

  const handleButtonClick = () => {
    setRedirectPath('/root/recommend'); // 추가
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
            src={mainGif}
            alt="tripnote시연영상"
            loading='lazy'
          />
        </div>
      </div>
      <div id="search" ref={searchRef} className="inner flex flex-col gap-8">
        <p>
          {redirectPath === '/root/recommend'
            ? '경로 추천입니다.'
            : '경로 생성입니다.'}
        </p>{' '}
        {/* 경로에 따른 메시지 표시 */}
        <form className="relative flex">
          <Selector />
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
        <img loading='lazy' src={elicelogo} alt="elice logo" className="w-40" />
      </div>
    </div>
  );
}
