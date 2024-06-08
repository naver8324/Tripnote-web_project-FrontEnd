import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion';
import React, { useState } from 'react';
import useMapSpotStore from '../../store/useMapSpotStore';

export default function BarRootSpot() {
  const routes = useMapSpotStore((state) => state.routes);
  const setSelectedRouteIndex = useMapSpotStore(
    (state) => state.setSelectedRouteIndex,
  );
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleRouteClick = (index) => {
    setSelectedRouteIndex(index);
    const route = routes[index];
    const markers = route.spots.map((spot) => ({
      latitude: spot.lat,
      longitude: spot.lng,
      id: spot.id,
    }));
    setSelectedMarker(markers[0]); // 루트의 첫 번째 스팟을 선택된 마커로 설정
  };

  return (
    <div className="w-[340px]">
      <Accordion type="single" collapsible>
        {routes.map((route, index) => (
          <AccordionItem
            key={route.routeId}
            value={`item-${index + 1}`}
            onClick={() => handleRouteClick(index)}
          >
            <AccordionTrigger>
              <p className="text-3xl">{`경로 ${index + 1}`}</p>
            </AccordionTrigger>
            <AccordionContent>
              {route.spots.map((spot) => (
                <div
                  key={spot.id}
                  onClick={() =>
                    setSelectedMarker({
                      latitude: spot.lat,
                      longitude: spot.lng,
                      id: spot.id,
                    })
                  }
                >
                  <p className="text-lg font-bold">{spot.location}</p>
                  <p>{spot.address}</p>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
