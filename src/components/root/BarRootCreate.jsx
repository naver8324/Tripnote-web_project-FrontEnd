import React from 'react';
import SpotDndCard from '../rootCreateSpotList/SpotDndCard';
import useMapCreateStore from '../../store/useMapCreateStore';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function BarRootCreate() {
  const routeSpots = useMapCreateStore((state) => state.routeSpots);
  const setRouteSpots = useMapCreateStore((state) => state.setRouteSpots);
  const setMarkers = useMapCreateStore((state) => state.setMarkers);

  const moveSpot = (fromIndex, toIndex) => {
    const updatedSpots = [...routeSpots];
    const [movedSpot] = updatedSpots.splice(fromIndex, 1);
    updatedSpots.splice(toIndex, 0, movedSpot);
    setRouteSpots(updatedSpots);
    const newMarkers = updatedSpots.map((spot, index) => ({
      latitude: spot.lat,
      longitude: spot.lng,
      id: spot.id,
      index: index + 1,
    }));
    setMarkers(newMarkers);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-[340px] m-5">
        <p className="text-lg">스팟을 드래그하여 경로를 만들어보세요!</p>
        {routeSpots.map((spot, index) => (
          <SpotDndCard
            key={spot.id}
            spot={spot}
            index={index}
            moveSpot={moveSpot}
          />
        ))}
      </div>
    </DndProvider>
  );
}
