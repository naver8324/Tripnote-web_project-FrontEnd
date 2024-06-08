import React, { useEffect, useState, useRef } from 'react';
import {
  loadNaverMapScript,
  updateMarkers,
  updatePolylines,
} from './naverMapHelpers';

export default function NaverSpotMap({
  className,
  markers,
  center,
  selectedRouteIndex,
  routes,
}) {
  const mapRef = useRef(null);
  const [naverMap, setNaverMap] = useState(null);

  useEffect(() => {
    const cleanup = loadNaverMapScript(() => {
      const mapOptions = {
        center: new window.naver.maps.LatLng(
          markers[0]?.latitude || 37.5665,
          markers[0]?.longitude || 126.978,
        ),
        zoom: 12,
      };
      const map = new window.naver.maps.Map(mapRef.current, mapOptions);
      setNaverMap(map);

      if (routes && routes.length > 0) {
        routes.forEach((route, index) => {
          const routeMarkers = route.spots.map((spot) => ({
            latitude: spot.lat,
            longitude: spot.lng,
          }));
          updateMarkers(map, routeMarkers);
          updatePolylines(map, routeMarkers, [
            'rgba(255, 0, 0, 0.7)', // 연빨간색
            'rgba(135, 206, 250, 0.7)', // 하늘색
            'rgba(147, 112, 219, 0.7)', // 연보라색
          ]);
        });
      }
    });

    return cleanup;
  }, [routes]);

  useEffect(() => {
    if (naverMap) {
      if (selectedRouteIndex !== null && routes && routes[selectedRouteIndex]) {
        const selectedMarkers = routes[selectedRouteIndex].spots.map(
          (spot) => ({
            latitude: spot.lat,
            longitude: spot.lng,
          }),
        );
        updateMarkers(naverMap, selectedMarkers);
        updatePolylines(naverMap, selectedMarkers, [
          'rgba(255, 0, 0, 0.7)', // 연빨간색
          'rgba(135, 206, 250, 0.7)', // 하늘색
          'rgba(147, 112, 219, 0.7)', // 연보라색
        ]);
      } else {
        updateMarkers(naverMap, markers);
        updatePolylines(naverMap, markers, [
          'rgba(255, 0, 0, 0.7)', // 연빨간색
          'rgba(135, 206, 250, 0.7)', // 하늘색
          'rgba(147, 112, 219, 0.7)', // 연보라색
        ]);
      }

      if (center) {
        const newCenter = new window.naver.maps.LatLng(
          center.latitude,
          center.longitude,
        );
        naverMap.setCenter(newCenter);
      }
    }
  }, [markers, center, selectedRouteIndex, routes]);

  return <div id="map" className={`h-auto ${className}`} ref={mapRef}></div>;
}
