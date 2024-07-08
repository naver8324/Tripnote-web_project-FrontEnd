import React, { useState, useEffect } from 'react';
import NoData from './../../pages/Board/NoData';
import useConditionalRegionRoutes from '../../Hooks/routes/useConditionalRegionRoutes';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import RouteInteraction from '../SpotSearchList/RouteInteraction';
import useMapRegionStore from '../../store/useMapRegionStore';

export default function BarRootArea({ selectedRegion }) {
  const {
    responseData: routes,
    error,
    loading,
    fetchData,
  } = useConditionalRegionRoutes(selectedRegion);
  const setMarkers = useMapRegionStore((state) => state.setMarkers);
  const setRoutes = useMapRegionStore((state) => state.setRoutes);
  const setCenter = useMapRegionStore((state) => state.setCenter);
  const setSelectedRouteIndex = useMapRegionStore(
    (state) => state.setSelectedRouteIndex,
  );

  const [likeStates, setLikeStates] = useState([]);
  const [bookmarkStates, setBookmarkStates] = useState([]);
  const [openItems, setOpenItems] = useState([]);

  useEffect(() => {
    if (selectedRegion) {
      fetchData();
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (Array.isArray(routes)) {
      setLikeStates(routes.map((route) => route.likedAt));
      setBookmarkStates(routes.map((route) => route.markedAt));

      if (routes.length > 0) {
        const routeMarkers = routes.flatMap((route) =>
          route.spots.map((spot) => ({
            latitude: spot.lat,
            longitude: spot.lng,
            name: spot.location,
          })),
        );
        setMarkers(routeMarkers);
        setRoutes(routes);
        setCenter({
          latitude: routeMarkers[0].latitude,
          longitude: routeMarkers[0].longitude,
        });
        setSelectedRouteIndex(0); // 첫 번째 경로를 기본 선택
      }
    }
  }, [routes, setMarkers, setRoutes, setCenter, setSelectedRouteIndex]);

  const handleRouteClick = (index) => {
    setOpenItems([`item-${index + 1}`]);
    setSelectedRouteIndex(index);
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

  const getColorClass = (index) => {
    return index % 5 === 0
      ? 'bg-green-500'
      : index % 5 === 1
        ? 'bg-blue-500'
        : index % 5 === 2
          ? 'bg-purple-500'
          : index % 5 === 3
            ? 'bg-yellow-500'
            : 'bg-red-500';
  };

  return (
    <div className="w-[340px]">
      {!loading && (!routes || routes.length === 0) && (
        <NoData message={'No data!'} />
      )}
      {Array.isArray(routes) && routes.length > 0 && (
        <Accordion
          type="multiple"
          value={openItems}
          onValueChange={setOpenItems}
        >
          <p className="m-5 text-xl">지역 중심 추천 경로</p>
          {routes.map((route, index) => {
            const colorClass = getColorClass(index);
            return (
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
                    className={`relative flex items-center justify-center text-xl w-8 h-8 text-white rounded-full ${colorClass}`}
                  >
                    {`${index + 1}`}
                    <span className="absolute inset-0.5 border-2 border-white rounded-full"></span>
                  </p>
                  <p className="text-black pb-[2px] text-2xl">추천 경로</p>
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
                        openItems.includes(`item-${index + 1}`)
                          ? 'rotate-180'
                          : ''
                      }`}
                    />
                  </AccordionTrigger>
                </div>

                <AccordionContent
                  className="overflow-hidden transition-all duration-500"
                  data-state={
                    openItems.includes(`item-${index + 1}`) ? 'open' : 'closed'
                  }
                >
                  <div className="mt-4 rounded-xl">
                    {route.spots.map((spot, spotIndex) => (
                      <div
                        key={spot.id}
                        className="p-2"
                        onClick={() => setOpenItems([])}
                      >
                        <div className="flex items-center">
                          <div className="flex items-center">
                            {' '}
                            <p
                              className={`ml-2 ${spotIndex < 9 ? 'pl-2' : ''} text-xl w-7 h-7 text-white rounded-3xl ${colorClass}`}
                            >
                              {' '}
                              {`${spotIndex + 1}`}
                            </p>
                          </div>
                          <div>
                            <p className="text-lg font-bold ml-4">
                              {spot.location}
                            </p>

                            <p className="pl-4 whitespace-pre-wrap">
                              {spot.address}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </div>
  );
}
