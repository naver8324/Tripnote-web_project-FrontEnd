import React, { useState, useEffect } from 'react';
import SpotCard from './SpotCard';
import useMapSpotStore from '../../store/useMapSpotStore';
import Input from '../commons/Input';
import useSpots from '../../Hooks/spots/useSpots';
import useConditionalSpotRoutes from '../../Hooks/routes/useConditionalSpotRoutes';

const SpotSearchList = ({ region }) => {
  const setMarkers = useMapSpotStore((state) => state.setMarkers);
  const setRoutes = useMapSpotStore((state) => state.setRoutes);
  const setSelectedRouteIndex = useMapSpotStore(
    (state) => state.setSelectedRouteIndex,
  );
  const setOpenItems = useMapSpotStore((state) => state.setOpenItems);
  const setClickedSpotName = useMapSpotStore(
    (state) => state.setClickedSpotName,
  );
  const setCenter = useMapSpotStore((state) => state.setCenter);

  const [selectedSpotId, setSelectedSpotId] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  const {
    spots: initialSpots,
    error: initialError,
    loading: initialLoading,
  } = useSpots(region);
  const {
    spots: searchedSpots,
    error: searchError,
    loading: searchLoading,
  } = useSpots(region, searchLocation);
  const {
    responseData: routes,
    error: routeError,
    loading: routeLoading,
  } = useConditionalSpotRoutes(selectedSpotId);

  useEffect(() => {
    if (routes && routes.length > 0) {
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
    } else if (selectedSpotId) {
      const spot = initialSpots.find((spot) => spot.id === selectedSpotId);
      if (spot) {
        setMarkers([
          { latitude: spot.lat, longitude: spot.lng, name: spot.location },
        ]);
        setCenter({ latitude: spot.lat, longitude: spot.lng });
      }
    }
  }, [routes, setMarkers, setRoutes, setCenter, selectedSpotId, initialSpots]);

  const handleSpotClick = (spot) => {
    const validRoutes = routes || [];

    // 우선 순서를 변경하여 경로와 중심을 먼저 설정
    setSelectedSpotId(spot.id);
    setClickedSpotName(spot.location);
    setSelectedRouteIndex(validRoutes.length > 0 ? 0 : null);
    setCenter({
      latitude: spot.lat,
      longitude: spot.lng,
    });
    setOpenItems([]);
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setSearchLocation(searchInput);
  };

  return (
    <form
      className="relative mt-4 flex-col justify-center h-full"
      onSubmit={handleSearch}
    >
      <div className="pt-4 pb-4 pl-3 flex">
        <Input
          variant="searchInput"
          placeholder="여행지를 검색해보세요!"
          value={searchInput}
          onChange={handleInputChange}
        />
      </div>
      <div className="w-full mr-2 h-[calc(100vh-150px)] overflow-y-auto">
        {/* 스크롤 가능한 div */}
        {initialLoading && <p>Loading initial spots...</p>}
        {initialError && <p>Error loading initial spots: {initialError}</p>}
        {searchLoading && <p>Loading search results...</p>}
        {searchError && <p>{searchError}</p>}
        {(searchLocation ? searchedSpots : initialSpots)?.length > 0
          ? (searchLocation ? searchedSpots : initialSpots).map((spot) => (
              <SpotCard
                key={spot.id}
                spot={spot}
                isSelected={selectedSpotId === spot.id}
                onClick={() => handleSpotClick(spot)}
              />
            ))
          : !searchLoading && <p>검색 결과가 없습니다.</p>}
      </div>
    </form>
  );
};

export default SpotSearchList;
