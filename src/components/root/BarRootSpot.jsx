import React, { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import useMapSpotStore from '../../store/useMapSpotStore';

export default function BarRootSpot() {
  const routes = useMapSpotStore((state) => state.routes);
  const clickedSpotName = useMapSpotStore((state) => state.clickedSpotName); // 클릭한 스팟 이름 가져오기
  const setSelectedRouteIndex = useMapSpotStore(
    (state) => state.setSelectedRouteIndex,
  );
  const setPolylineColors = useMapSpotStore((state) => state.setPolylineColors);
  const polylineColors = useMapSpotStore((state) => state.polylineColors); // 현재 폴리라인 색상 가져오기
  const openItems = useMapSpotStore((state) => state.openItems); // 상태 가져오기
  const setOpenItems = useMapSpotStore((state) => state.setOpenItems); // 상태 설정 함수 가져오기

  const textColors = [
    'text-red-400', // 경로 1 텍스트 색상
    'text-green-400', // 경로 2 텍스트 색상
    'text-blue-400', // 경로 3 텍스트 색상
  ];

  const handleRouteClick = (index) => {
    console.log('handleRouteClick:', index);
    setSelectedRouteIndex(index);
    setOpenItems([`item-${index + 1}`]); // 선택한 아코디언 항목만 열기
  };

  const handleToggle = (value) => {
    setOpenItems((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    ); // 클릭한 아코디언 항목의 열림/닫힘 상태 토글
  };

  return (
    <div className="w-[340px]">
      <Accordion type="multiple" value={openItems} onValueChange={setOpenItems}>
        <p className="m-5 text-xl"> 스팟 중심 추천 경로</p>
        {routes.map((route, index) => (
          <AccordionItem
            key={route.routeId}
            value={`item-${index + 1}`}
            className="p-4 m-4 shadow-lg rounded-lg" // 각 아코디언 항목 사이에 간격 추가
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleRouteClick(index)}
            >
              <p
                className={`text-3xl ${textColors[index]}`} // 텍스트 색상 항상 적용
              >
                {`추천 경로 ${index + 1}`}
              </p>
              <AccordionTrigger
                className="ml-2"
                onClick={(e) => {
                  e.stopPropagation(); // 부모 div 클릭 이벤트 중지
                  handleToggle(`item-${index + 1}`);
                }}
              >
                <ChevronDown
                  className={`h-8 w-8 transition-transform duration-200 ${openItems.includes(`item-${index + 1}`) ? 'rotate-180' : ''}`}
                />
              </AccordionTrigger>
            </div>
            <AccordionContent>
              <div className="mt-4 rounded-xl">
                {route.spots.map((spot) => (
                  <div
                    key={spot.id}
                    className="p-2"
                    onClick={() => setOpenItems([])} // 모든 아코디언 항목 닫기
                  >
                    <p className="text-lg font-bold">{spot.location}</p>
                    <p>{spot.address}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
