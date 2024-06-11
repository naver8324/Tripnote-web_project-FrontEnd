import React, { useEffect, useRef, useState } from 'react';
import {
  loadNaverMapScript,
  updateMarkers,
  updatePolylines,
} from './naverMapHelpers';
import useMapSpotStore from '../../store/useMapSpotStore';

export default function NaverSpotMap({
  className,
  markers,
  center,
  selectedRouteIndex,
  routes,
  polylineColors, // 폴리라인 색상에 대한 새로운 props
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
          updatePolylines(map, routeMarkers, [polylineColors[index]]); // 폴리라인 색상 전달
        });
      }
    });

    return cleanup;
  }, [routes, polylineColors]);

  useEffect(() => {
    if (naverMap) {
      console.log('selectedRouteIndex:', selectedRouteIndex);
      if (selectedRouteIndex !== null && routes && routes[selectedRouteIndex]) {
        const selectedMarkers = routes[selectedRouteIndex].spots.map(
          (spot) => ({
            latitude: spot.lat,
            longitude: spot.lng,
          }),
        );
        console.log('Selected route markers:', selectedMarkers);
        updateMarkers(naverMap, selectedMarkers);
        updatePolylines(naverMap, selectedMarkers, [
          polylineColors[selectedRouteIndex],
        ]); // 폴리라인 색상 전달
      } else {
        const allMarkers = routes.flatMap((route) =>
          route.spots.map((spot) => ({
            latitude: spot.lat,
            longitude: spot.lng,
          })),
        );
        console.log('All route markers:', allMarkers);
        updateMarkers(naverMap, allMarkers);
        updatePolylines(naverMap, allMarkers, polylineColors); // 모든 경로의 폴리라인 색상 전달
      }

      if (center) {
        const newCenter = new window.naver.maps.LatLng(
          center.latitude,
          center.longitude,
        );
        naverMap.setCenter(newCenter);
      }
    }
  }, [markers, center, selectedRouteIndex, routes, polylineColors]);

  return <div id="map" className={`h-auto ${className}`} ref={mapRef}></div>;
}
