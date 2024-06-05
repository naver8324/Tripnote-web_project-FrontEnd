import React, { useEffect, useState, useRef } from 'react';

export default function NaverMap({ className, markers }) {
  const mapRef = useRef(null);
  const [naverMap, setNaverMap] = useState(null);

  const loadNaverMapScript = () => {
    const script = document.createElement('script');
    script.src =
      'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=r1gni5e2d1&language=ko';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (markers.length === 0) return;

      const mapOptions = {
        center: new window.naver.maps.LatLng(
          markers[0].latitude,
          markers[0].longitude,
        ),
        zoom: 14,
      };
      const map = new window.naver.maps.Map('map', mapOptions);
      setNaverMap(map); // 상태로 네이버 맵 인스턴스 저장

      addMarkers(map, markers);
      drawPolyline(map, markers);
    };

    return () => {
      document.head.removeChild(script);
    };
  };

  const addMarkers = (map, markers) => {
    markers.forEach(({ longitude, latitude }) => {
      const position = new window.naver.maps.LatLng(latitude, longitude);
      new window.naver.maps.Marker({
        position,
        map,
      });
    });
  };

  const drawPolyline = (map, markers) => {
    const path = markers.map(
      ({ longitude, latitude }) =>
        new window.naver.maps.LatLng(latitude, longitude),
    );

    new window.naver.maps.Polyline({
      path,
      strokeColor: '#5347AA',
      strokeWeight: 2,
      map,
    });
  };

  useEffect(() => {
    if (!naverMap) {
      const cleanup = loadNaverMapScript();
      return cleanup;
    } else {
      addMarkers(naverMap, markers);
      drawPolyline(naverMap, markers);
    }
  }, [markers]); // markers 배열이 변경될 때마다 이 useEffect가 실행

  return <div id="map" className={`h-auto ${className}`} ref={mapRef}></div>;
}
