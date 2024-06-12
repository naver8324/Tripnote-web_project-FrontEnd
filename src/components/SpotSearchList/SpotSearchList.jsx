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
  const setOpenItems = useMapSpotStore((state) => state.setOpenItems); // 상태 추가
  const setClickedSpotName = useMapSpotStore(
    (state) => state.setClickedSpotName,
  ); // 상태 추가

  const [selectedSpotId, setSelectedSpotId] = useState(null);
  const [center, setCenter] = useState(null);
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
      const routeMarkers = routes.flatMap((route) =>
        route.spots.map((spot) => ({
          latitude: spot.lat,
          longitude: spot.lng,
          name: spot.location, // 스팟 이름 추가
        })),
      );
      console.log('Route markers:', routeMarkers);
      setMarkers(routeMarkers);
      setRoutes(routes); // 전역 상태로 루트 설정
      setCenter({
        latitude: routeMarkers[0].latitude,
        longitude: routeMarkers[0].longitude,
      });
      setSelectedRouteIndex(null); // 모든 경로를 표시하도록 설정
    }
  }, [routes, setMarkers, setRoutes]);

  const handleSpotClick = (spot) => {
    console.log('handleSpotClick:', spot);
    setSelectedSpotId(spot.id);
    const newCenter = { latitude: spot.lat, longitude: spot.lng };
    setCenter(newCenter);
    setSelectedRouteIndex(null); // 특정 스팟을 선택하면 모든 경로를 표시
    setOpenItems([]); // 모든 아코디언 항목 닫기
    setClickedSpotName(spot.location); // 클릭한 스팟 이름 설정
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
    </form>
  );
};

export default SpotSearchList;
