import React, { useState, useEffect } from 'react';
import Input from '../commons/Input';
import useSpotRoutes from '../../Hooks/routes/useSpotRoutes';
import useSpots from '../../Hooks/spots/useSpots';
import SpotPlusCard from './SpotPlusCard';
import useMapCreateStore from '../../store/useMapCreateStore';

const RootCreateSpotList = ({ region }) => {
  const setMarkers = useMapCreateStore((state) => state.setMarkers);
  const setCenter = useMapCreateStore((state) => state.setCenter);
  const addSpotToRoute = useMapCreateStore((state) => state.addSpotToRoute);
  const removeSpotFromRoute = useMapCreateStore(
    (state) => state.removeSpotFromRoute,
  );
  const routeSpots = useMapCreateStore((state) => state.routeSpots);
  const [selectedSpotId, setSelectedSpotId] = useState(null);

  const { spots, error, loading } = useSpots(region);
  const {
    responseData: routes,
    error: routeError,
    loading: routeLoading,
  } = useSpotRoutes(selectedSpotId);

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

  return (
    <form className="relative mt-4 flex-col justify-center">
      <div className="pt-4 pb-4 pl-3">
        <Input variant="searchInput" placeholder="여행지를 검색해보세요!" />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error loading spots: {error}</p>}
      {spots &&
        spots.map((spot) => (
          <SpotPlusCard
            key={spot.id}
            spot={spot}
            onAddClick={() => addSpotToRoute(spot)}
            onRemoveClick={() => removeSpotFromRoute(spot.id)}
            isAdded={isSpotAdded(spot)}
          />
        ))}
    </form>
  );
};

export default RootCreateSpotList;
