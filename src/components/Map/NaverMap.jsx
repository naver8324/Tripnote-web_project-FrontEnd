import React, { useEffect, useRef, useState } from 'react';
import {
  loadNaverMapScript,
  updateMarkers,
  updatePolylines,
} from './naverMapHelpers';
import useRouteData from '../../Hooks/routes/useRouteData';

const NaverMap = ({ className, routeId }) => {
  const mapRef = useRef(null);
  const [naverMap, setNaverMap] = useState(null);
  const { routeData, error, loading } = useRouteData(routeId);
  const [markers, setMarkers] = useState([]);

  // Load the Naver Map script
  useEffect(() => {
    const cleanup = loadNaverMapScript(() => {
      // The map initialization will happen in another useEffect
    });

    return cleanup;
  }, []);

  // Initialize the Naver Map after the component has rendered
  useEffect(() => {
    if (mapRef.current && window.naver && window.naver.maps) {
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.5665, 126.978), // 기본 중심 좌표
        zoom: 12,
      };
      const map = new window.naver.maps.Map(mapRef.current, mapOptions);
      setNaverMap(map);
    } else {
      console.error('mapRef.current or window.naver.maps is not available');
    }
  }, [mapRef.current, window.naver]);

  // Update markers and polylines when routeData or naverMap changes
  useEffect(() => {
    if (routeData && routeData.spots) {
      const newMarkers = routeData.spots.map((spot) => ({
        latitude: spot.lat,
        longitude: spot.lng,
        id: spot.id,
      }));
      setMarkers(newMarkers);
    }
  }, [routeData]);

  useEffect(() => {
    if (naverMap && markers.length > 0) {
      updateMarkers(naverMap, markers);
      updatePolylines(naverMap, markers);
      const bounds = new window.naver.maps.LatLngBounds();
      markers.forEach((marker) => {
        bounds.extend(
          new window.naver.maps.LatLng(marker.latitude, marker.longitude),
        );
      });
      naverMap.fitBounds(bounds);
    }
  }, [naverMap, markers]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div id="map" className={`w-full h-80 ${className}`} ref={mapRef}></div>
  );
};

export default NaverMap;
