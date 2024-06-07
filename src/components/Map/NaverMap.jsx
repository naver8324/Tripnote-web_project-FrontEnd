import React, { useEffect, useState, useRef } from 'react';

export default function NaverMap({
  className,
  markers,
  center,
  selectedRouteIndex,
}) {
  const mapRef = useRef(null);
  const [naverMap, setNaverMap] = useState(null);
  const markerColor = '#1DC078';

  const loadNaverMapScript = () => {
    const script = document.createElement('script');
    script.src =
      'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=r1gni5e2d1&language=ko';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const mapOptions = {
        center: new window.naver.maps.LatLng(
          markers[0]?.latitude || 37.5665,
          markers[0]?.longitude || 126.978,
        ),
        zoom: 14,
      };
      const map = new window.naver.maps.Map(mapRef.current, mapOptions);
      setNaverMap(map);

      if (markers.length > 0) {
        updateMarkers(map, markers);
        updatePolylines(map, markers);
      }
    };

    return () => {
      document.head.removeChild(script);
    };
  };

  const updateMarkers = (map, markers) => {
    // 기존 마커 제거
    if (map.markers) {
      map.markers.forEach((marker) => marker.setMap(null));
    }

    const newMarkers = markers.map((marker, index) => {
      const position = new window.naver.maps.LatLng(
        marker.latitude,
        marker.longitude,
      );
      const content = `
        <div style="
          background-color: ${markerColor};
          border: 2px solid white;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          color: white;
        ">
          ${index + 1}
        </div>
      `;

      return new window.naver.maps.Marker({
        position,
        map,
        icon: {
          content,
          anchor: new window.naver.maps.Point(15, 15),
        },
      });
    });

    map.markers = newMarkers;
  };

  const updatePolylines = (map, markers) => {
    // 기존 폴리라인 제거
    if (map.polylines) {
      map.polylines.forEach((polyline) => polyline.setMap(null));
    }

    const colors = [
      'rgba(255, 0, 0, 0.7)', // 연빨간색
      'rgba(135, 206, 250, 0.7)', // 하늘색
      'rgba(147, 112, 219, 0.7)', // 연보라색
    ];

    const newPolylines = markers
      .map((marker, index) => {
        if (index > 0) {
          const path = [
            new window.naver.maps.LatLng(
              markers[index - 1].latitude,
              markers[index - 1].longitude,
            ),
            new window.naver.maps.LatLng(marker.latitude, marker.longitude),
          ];

          return new window.naver.maps.Polyline({
            path,
            strokeColor: colors[selectedRouteIndex % colors.length],
            strokeWeight: 6,
            map,
          });
        }
        return null;
      })
      .filter((polyline) => polyline !== null);

    map.polylines = newPolylines;
  };

  useEffect(() => {
    if (!naverMap) {
      const cleanup = loadNaverMapScript();
      return cleanup;
    } else {
      updateMarkers(naverMap, markers);
      updatePolylines(naverMap, markers);

      if (center) {
        const newCenter = new window.naver.maps.LatLng(
          center.latitude,
          center.longitude,
        );
        naverMap.setCenter(newCenter);
      }
    }
  }, [markers, center, selectedRouteIndex]); // markers, center, selectedRouteIndex가 변경될 때마다 이 useEffect가 실행

  return <div id="map" className={`h-auto ${className}`} ref={mapRef}></div>;
}
