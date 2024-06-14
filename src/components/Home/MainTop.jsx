import React from 'react';
import Section from './Section';
import mainImg from '../../assets/travel.jpg';
import curve from '../../assets/curve.png';

export default function MainTop() {
  return (
    <div>
      <div className>
        <div className="relative z-1 mx-auto text-center">
          <img
            src={mainImg}
            alt="main image"
            className="h-screen w-full object-cover"
          />
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-5xl tracking-wide text-center">
            당일 여행 계획은 <br />
            <span className="inline-block relative">트립노트에서! </span>
            <img
              src={curve}
              className="absolute xl:-mt-2"
              width={600}
              height={28}
            />
          </p>
        </div>
      </div>
    </div>
  );
}
