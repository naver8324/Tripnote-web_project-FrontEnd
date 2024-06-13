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
  polylineColors,
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
          if (index === selectedRouteIndex) {
            const routeMarkers = route.spots.map((spot) => ({
              latitude: spot.lat,
              longitude: spot.lng,
            }));
            updateMarkers(map, routeMarkers);
            updatePolylines(map, routeMarkers, [polylineColors[index]]);
          }
        });
      }
    });

    return cleanup;
  }, [routes, selectedRouteIndex, polylineColors]);

  useEffect(() => {
    if (naverMap && routes && selectedRouteIndex !== null) {
      const selectedMarkers = routes[selectedRouteIndex].spots.map((spot) => ({
        latitude: spot.lat,
        longitude: spot.lng,
      }));
      updateMarkers(naverMap, selectedMarkers);
      updatePolylines(naverMap, selectedMarkers, [
        polylineColors[selectedRouteIndex],
      ]);
    }
  }, [naverMap, selectedRouteIndex, routes, polylineColors]);

  useEffect(() => {
    if (naverMap && center) {
      const newCenter = new window.naver.maps.LatLng(
        center.latitude,
        center.longitude,
      );
      naverMap.setCenter(newCenter);
    }
  }, [naverMap, center]);

  return <div id="map" className={`h-auto ${className}`} ref={mapRef}></div>;
}
