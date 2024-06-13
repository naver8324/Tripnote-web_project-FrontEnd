import React, { useEffect, useRef, useState } from 'react';
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
    });

    return cleanup;
  }, []);

  useEffect(() => {
    if (naverMap) {
      if (
        routes &&
        routes.length > 0 &&
        selectedRouteIndex !== null &&
        routes[selectedRouteIndex]
      ) {
        const selectedMarkers = routes[selectedRouteIndex].spots.map(
          (spot) => ({
            latitude: spot.lat,
            longitude: spot.lng,
          }),
        );
        updateMarkers(naverMap, selectedMarkers);
        updatePolylines(naverMap, selectedMarkers, [
          polylineColors[selectedRouteIndex],
        ]);

        if (selectedMarkers.length > 0) {
          const newCenter = new window.naver.maps.LatLng(
            selectedMarkers[0].latitude,
            selectedMarkers[0].longitude,
          );
          naverMap.setCenter(newCenter);
        }
      } else if (markers && markers.length === 1) {
        updateMarkers(naverMap, markers);
        const newCenter = new window.naver.maps.LatLng(
          markers[0].latitude,
          markers[0].longitude,
        );
        naverMap.setCenter(newCenter);
      }
    }
  }, [naverMap, selectedRouteIndex, routes, polylineColors, markers]);

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
