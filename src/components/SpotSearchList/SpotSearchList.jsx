import React, { useState, useEffect } from 'react';
import SpotCard from './SpotCard';
import useMapSpotStore from '../../store/useMapSpotStore';
import Input from '../commons/Input';
import useSpotRoutes from '../../Hooks/routes/useSpotRoutes';
import useSpots from '../../Hooks/spots/useSpots';

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

  // 선택한 지역의 스팟 데이터를 가져오는 useSpots 훅 사용
  const { spots, error, loading } = useSpots(region);
  const {
    responseData: routes,
    error: routeError,
    loading: routeLoading,
  } = useSpotRoutes(selectedSpotId);

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

  return (
    <form className="relative mt-4 flex-col justify-center">
      <div className="pt-4 pb-4 pl-3">
        <Input variant="searchInput" placeholder="여행지를 검색해보세요!" />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error loading spots: {error}</p>}
      {spots &&
        spots.map((spot) => (
          <SpotCard
            key={spot.id}
            spot={spot}
            onClick={() => handleSpotClick(spot)}
          />
        ))}
    </form>
  );
};

export default SpotSearchList;
