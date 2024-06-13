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
                  className={`text-3xl ${
                    index % 5 === 0
                      ? 'text-green-500'
                      : index % 5 === 1
                        ? 'text-blue-500'
                        : index % 5 === 2
                          ? 'text-purple-500'
                          : index % 5 === 3
                            ? 'text-yellow-500'
                            : 'text-red-500'
                  }`}
                >
                  {`추천 경로 ${index + 1}`}
                </p>
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
      )}
    </div>
  );
}
