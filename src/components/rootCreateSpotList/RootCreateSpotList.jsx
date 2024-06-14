import React, { useState, useEffect } from 'react';
import Input from '../commons/Input';
import useSpots from '../../Hooks/spots/useSpots';
import SpotPlusCard from './SpotPlusCard';
import useMapCreateStore from '../../store/useMapCreateStore';
import useConditionalSpotRoutes from '../../Hooks/routes/useConditionalSpotRoutes';

const RootCreateSpotList = ({ region }) => {
  const setMarkers = useMapCreateStore((state) => state.setMarkers);
  const setCenter = useMapCreateStore((state) => state.setCenter);
  const addSpotToRoute = useMapCreateStore((state) => state.addSpotToRoute);
  const removeSpotFromRoute = useMapCreateStore(
    (state) => state.removeSpotFromRoute,
  );
  const routeSpots = useMapCreateStore((state) => state.routeSpots);
  const [selectedSpotId, setSelectedSpotId] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  // 초기 로드 시 region 값만으로 스팟 데이터를 가져오는 useSpots 훅 사용
  const {
    spots: initialSpots,
    error: initialError,
    loading: initialLoading,
  } = useSpots(region);
  // 검색 시 사용될 스팟 데이터를 가져오는 useSpots 훅 사용
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
      const routeMarkers = routes[0].spots.map((spot) => ({
        latitude: spot.lat,
        longitude: spot.lng,
        name: spot.location, // 스팟 이름 추가
      }));
      setMarkers(routeMarkers);
      setCenter({
        latitude: routeMarkers[0].latitude,
        longitude: routeMarkers[0].longitude,
      });
    }
  }, [routes, setMarkers]);

  const handleSpotClick = (spot) => {
    setSelectedSpotId(spot.id);
    setCenter({ latitude: spot.lat, longitude: spot.lng });
  };

  const isSpotAdded = (spot) => {
    return routeSpots.some((routeSpot) => routeSpot.id === spot.id);
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
      className="relative mt-4 flex-col justify-center"
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
        {initialLoading && <p>Loading initial spots...</p>}
        {initialError && <p>Error loading initial spots: {initialError}</p>}
        {searchLoading && <p>Loading search results...</p>}
        {searchError && <p>{searchError}</p>}
        {(searchLocation ? searchedSpots : initialSpots)?.length > 0
          ? (searchLocation ? searchedSpots : initialSpots).map((spot) => (
              <SpotPlusCard
                key={spot.id}
                spot={spot}
                onAddClick={() => addSpotToRoute(spot)}
                onRemoveClick={() => removeSpotFromRoute(spot.id)}
                isAdded={isSpotAdded(spot)}
              />
            ))
          : !searchLoading && <p>검색 결과가 없습니다.</p>}
      </div>
    </form>
  );
};

export default RootCreateSpotList;
