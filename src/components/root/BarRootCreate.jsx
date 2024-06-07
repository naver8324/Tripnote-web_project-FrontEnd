import React from 'react';
import useMapStore from '../../store/useMapStore';
import SpotDndCard from '../rootCreateSpotList/SpotDndCard';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function BarRootCreate() {
  const routeSpots = useMapStore((state) => state.routeSpots);
  const setRouteSpots = useMapStore((state) => state.setRouteSpots);

  const moveSpot = (fromIndex, toIndex) => {
    const updatedSpots = [...routeSpots];
    const [movedSpot] = updatedSpots.splice(fromIndex, 1);
    updatedSpots.splice(toIndex, 0, movedSpot);
    setRouteSpots(updatedSpots);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-[340px]">
        <p>경로생성 아코디언 컴포넌트</p>
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
