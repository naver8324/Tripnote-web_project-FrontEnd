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
import useRegionSearchStore from '../../store/useRegionSearchStore'; // 추가
import mainGif from '../../assets/maingif.gif';
import logo from '../../assets/logo-green.png';
import ReviewSlider from '../../components/Home/ReviewSlider';
import MainTop from '../../components/Home/MainTop';
import ReviewCard from '../../components/Home/ReviewCard';
import reviewImg1 from '../../assets/review1.jpg';
import ScrollToTopButton from '../../components/ui/ScrollToTopButton';

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
    <>
      <div className="outer">
        <div className="inner">
          <MainTop />
        </div>
        <div className="inner gap-40 tracking-wider bg-subBackground">
          <div className="text-4xl font-semibold flex flex-col gap-20">
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
          <div className="w-[500px]">
            <img src={mainGif} alt="tripnote시연영상" loading="lazy" />
          </div>
        </div>
        <div className="overflow-hidden">
        <div className="whitespace-nowrap animate-slide">
          <p>
            <img
              src={logo}
              alt="logo"
              className="inline-block h-10 mr-8"
              loading="lazy"
            />
            <img
              src={logo}
              alt="logo"
              className="inline-block h-10 mr-8"
              loading="lazy"
            />
            <img
              src={logo}
              alt="logo"
              className="inline-block h-10 mr-8"
              loading="lazy"
            />
            <img
              src={logo}
              alt="logo"
              className="inline-block h-10 mr-8"
              loading="lazy"
            />
            <img
              src={logo}
              alt="logo"
              className="inline-block h-10 mr-8"
              loading="lazy"
            />
            <img
              src={logo}
              alt="logo"
              className="inline-block h-10 mr-8"
              loading="lazy"
            />
            <img
              src={logo}
              alt="logo"
              className="inline-block h-10 mr-8"
              loading="lazy"
            />
            <img
              src={logo}
              alt="logo"
              className="inline-block h-10 mr-8"
              loading="lazy"
            />
            <img
              src={logo}
              alt="logo"
              className="inline-block h-10 mr-8"
              loading="lazy"
            />
            <img
              src={logo}
              alt="logo"
              className="inline-block h-10 mr-8"
              loading="lazy"
            />
            <img
              src={logo}
              alt="logo"
              className="inline-block h-10 mr-8"
              loading="lazy"
            />
            <img
              src={logo}
              alt="logo"
              className="inline-block h-10 mr-8"
              loading="lazy"
            />
            <img
              src={logo}
              alt="logo"
              className="inline-block h-10 mr-8"
              loading="lazy"
            />
          </p>
        </div>
      </div>
        <div
          id="search"
          ref={searchRef}
          className="inner 2xl:mx-auto max-w-[1440px] relative flex flex-col py-10 lg:mb-10 lg:py-20 xl:mb-20"
        >
          <div className="flex h-[340px] w-full items-start justify-start ml-[400px] gap-8 overflow-x-auto lg:h-[400px] xl:h-[640px]">
            <ReviewCard
              backGroundImg={reviewImg1}
              title="여행 추천부터 생성까지 !"
              content=""
              likes=""
            />
          </div>
          <div className="flex items-center justify-end mt-10 px-6 lg:-mt-80 lg:mr-[-500px]">
            <div className="ml-24 bg-prime p-8 lg:max-w-[500px] xl:max-w-[734px] xl:rounded-5xl xl:px-16 xl:py-20 relative w-full overflow-hidden rounded-3xl">
              <div className="text-title">
                <div className="flex gap-4 mb-8">
                  <h1 className="text-4xl font-semibold text-white">
                    {redirectPath === '/root/recommend'
                      ? '경로 추천'
                      : '경로 생성'}
                  </h1>
                </div>
                <form className="flex">
                  <Selector />
                </form>
              </div>
            </div>
          </div>
        </div>
        
        <div className="inner bg-gray-100">
          <ReviewSlider/>
        </div>
        <div className="h-96 flex flex-col justify-center items-center gap-16">
          <h1 className="text-title text-3xl font-semibold">PARTNERS</h1>
          <img
            loading="lazy"
            src={elicelogo}
            alt="elice logo"
            className="w-40"
          />
        </div>
        <ScrollToTopButton />
      </div>
    </>
  );
}
