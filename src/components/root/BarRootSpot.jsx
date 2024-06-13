import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import useMapSpotStore from '../../store/useMapSpotStore';
import RouteInteraction from '../SpotSearchList/RouteInteraction';

const BarRootSpot = () => {
  const routes = useMapSpotStore((state) => state.routes);
  const setSelectedRouteIndex = useMapSpotStore(
    (state) => state.setSelectedRouteIndex,
  );
  const openItems = useMapSpotStore((state) => state.openItems);
  const setOpenItems = useMapSpotStore((state) => state.setOpenItems);

  const [likeStates, setLikeStates] = useState([]);
  const [bookmarkStates, setBookmarkStates] = useState([]);
  const textColors = [
    'text-green-500',
    'text-blue-500',
    'text-purple-500',
    'text-yellow-500',
    'text-red-500',
  ]; // 텍스트 색상 배열 추가

  useEffect(() => {
    setLikeStates(routes.map((route) => route.likedAt));
    setBookmarkStates(routes.map((route) => route.markedAt));
  }, [routes]);

  const handleRouteClick = (index) => {
    setSelectedRouteIndex(index);
    setOpenItems([`item-${index + 1}`]);
  };

  const handleToggle = (value) => {
    setOpenItems((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const handleToggleLike = (index) => {
    setLikeStates((prev) =>
      prev.map((state, i) => (i === index ? !state : state)),
    );
  };

  const handleToggleBookmark = (index) => {
    setBookmarkStates((prev) =>
      prev.map((state, i) => (i === index ? !state : state)),
    );
  };

  return (
    <div className="w-[340px]">
      <Accordion type="multiple" value={openItems} onValueChange={setOpenItems}>
        <p className="m-5 text-xl">스팟 중심 추천 경로</p>
        {routes.map((route, index) => (
          <AccordionItem
            key={route.integratedRouteId}
            value={`item-${index + 1}`}
            className="p-4 m-4 shadow-lg rounded-lg"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleRouteClick(index)}
            >
              <p
                className={`text-3xl ${textColors[index % textColors.length]}`}
              >{`추천 경로 ${index + 1}`}</p>
              <RouteInteraction
                routeId={route.integratedRouteId}
                liked={likeStates[index]}
                bookmarked={bookmarkStates[index]}
                onToggleLike={() => handleToggleLike(index)}
                onToggleBookmark={() => handleToggleBookmark(index)}
              />
              <AccordionTrigger
                className="ml-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggle(`item-${index + 1}`);
                }}
              >
                <ChevronDown
                  className={`h-8 w-8 transition-transform duration-200 ${
                    openItems.includes(`item-${index + 1}`) ? 'rotate-180' : ''
                  }`}
                />
              </AccordionTrigger>
            </div>
            <AccordionContent>
              <div className="mt-4 rounded-xl">
                {route.spots.map((spot) => (
                  <div
                    key={spot.id}
                    className="p-2"
                    onClick={() => setOpenItems([])}
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
};

export default BarRootSpot;
