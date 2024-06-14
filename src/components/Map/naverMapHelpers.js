export const loadNaverMapScript = (callback) => {
  const script = document.createElement('script');
  script.src =
    'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=r1gni5e2d1&language=ko';
  script.async = true;
  document.head.appendChild(script);

  script.onload = () => {
    if (typeof callback === 'function') {
      callback();
    }
  };

  script.onerror = () => {
    console.error('Failed to load Naver Map script');
  };

  return () => {
    document.head.removeChild(script);
  };
};

export const updateMarkers = (map, markers) => {
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
        background-color: #1DC078;
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

export const updatePolylines = (map, markers, colors = ['#1DC078']) => {
  if (map.polylines) {
    map.polylines.forEach((polyline) => polyline.setMap(null));
  }

  const path = markers.map(
    (marker) => new window.naver.maps.LatLng(marker.latitude, marker.longitude),
  );

  const strokeColor = colors.length ? colors[0] : '#1DC078';

  const polyline = new window.naver.maps.Polyline({
    path,
    strokeColor,
    strokeWeight: 6,
    map,
  });

  map.polylines = [polyline];
};
