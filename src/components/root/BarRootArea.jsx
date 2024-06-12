import React, { useState, useEffect } from 'react';
import RootArea from './RootArea';
import NoData from './../../pages/Board/NoData';
import useRegionRoutes from '../../Hooks/routes/useRegionRoutes';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import {
  GoHeart,
  GoHeartFill,
  GoBookmark,
  GoBookmarkFill,
} from 'react-icons/go';

const RouteInteraction = ({
  routeId,
  liked,
  bookmarked,
  onToggleLike,
  onToggleBookmark,
}) => {
  return (
    <div className="flex space-x-4 mt-2">
      <button
        onClick={onToggleLike}
        className={liked ? 'text-red-400' : 'text-title'}
      >
        {liked ? <GoHeartFill /> : <GoHeart />}
      </button>
      <button
        onClick={onToggleBookmark}
        className={bookmarked ? 'text-blue-400' : 'text-title'}
      >
        {bookmarked ? <GoBookmarkFill /> : <GoBookmark />}
      </button>
    </div>
  );
};

export default function BarRootArea() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const { routes, error, loading, fetchRoutes } =
    useRegionRoutes(selectedRegion);

  const handleSelectRegion = (region) => {
    setSelectedRegion(region);
    fetchRoutes();
  };

  const [likeStates, setLikeStates] = useState([]);
  const [bookmarkStates, setBookmarkStates] = useState([]);
  const [openItems, setOpenItems] = useState([]);

  useEffect(() => {
    setLikeStates(routes.map((route) => route.likedAt));
    setBookmarkStates(routes.map((route) => route.markedAt));
  }, [routes]);

  const handleRouteClick = (index) => {
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
    <div className="w=[340px]">
      <RootArea onSelectRegion={handleSelectRegion} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && routes.length === 0 && <NoData message={'No data!'} />}
      {routes.length > 0 && (
        <div className="w-[340px]">
          <Accordion
            type="multiple"
            value={openItems}
            onValueChange={setOpenItems}
          >
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
                  <p
                    className={`text-3xl ${index % 3 === 0 ? 'text-red-400' : index % 3 === 1 ? 'text-green-400' : 'text-blue-400'}`}
                  >
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
      )}
    </div>
  );
}
