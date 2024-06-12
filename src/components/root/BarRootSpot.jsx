import React, { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import useMapSpotStore from '../../store/useMapSpotStore';
import RouteInteraction from '../SpotSearchList/RouteInteraction';

export default function BarRootSpot() {
  const routes = useMapSpotStore((state) => state.routes);
  const setSelectedRouteIndex = useMapSpotStore(
    (state) => state.setSelectedRouteIndex,
  );
  const openItems = useMapSpotStore((state) => state.openItems);
  const setOpenItems = useMapSpotStore((state) => state.setOpenItems);

  const textColors = ['text-red-400', 'text-green-400', 'text-blue-400'];

  const [likeStates, setLikeStates] = useState(
    routes.map((route) => route.likedAt),
  );
  const [bookmarkStates, setBookmarkStates] = useState(
    routes.map((route) => route.markedAt),
  );

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
    setLikeStates((prev) => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const handleToggleBookmark = (index) => {
    setBookmarkStates((prev) => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <div className="w-[340px]">
      <Accordion type="multiple" value={openItems} onValueChange={setOpenItems}>
        <p className="m-5 text-xl">스팟 중심 추천 경로</p>
        {routes.map((route, index) => (
          <AccordionItem
            key={route.routeId}
            value={`item-${index + 1}`}
            className="p-4 m-4 shadow-lg rounded-lg"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleRouteClick(index)}
            >
              <p className={`text-3xl ${textColors[index]}`}>
                {`추천 경로 ${index + 1}`}
              </p>
              <RouteInteraction
                routeId={route.routeId}
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
}
