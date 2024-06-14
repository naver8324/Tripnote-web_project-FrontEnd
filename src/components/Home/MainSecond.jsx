import React from 'react';
import Section from './Section';
import Button from '../commons/Button';

export default function MainSecond({callback}) {
  return (
    <Section id="mainSecond">
      <div className="text-3xl font-semibold flex flex-col gap-20">
        즉흥적인 여행을 위한
        <br /> 빠른 여행 플래너
        <div className="flex justify-start">
          <Button
            onClick={callback}
            variant="roundButton"
            size="large"
            className="bg-white hover:bg-prime text-title hover:text-white text-lg font-semibold px-6 py-2 rounded-full border-2 border-grey-300 hover:border-prime transition-all duration-300"
          >
            경로 추천
          </Button>
        </div>
      </div>
      <div className="">
        <img src={mainGif} alt="tripnote시연영상" loading="lazy" />
      </div>
    </Section>
  );
}
