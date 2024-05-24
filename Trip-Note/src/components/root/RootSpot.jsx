import React, { useEffect } from 'react';

const RootSpot = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=zwol10@naver.com`;
    script.async = true;
    script.onload = () => {
      // 네이버 지도 API 로드 후에 실행할 코드
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10,
      };

      const map = new window.naver.maps.Map('map', mapOptions);
    };
    document.body.appendChild(script);

    // Clean-up
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
};

export default RootSpot;
