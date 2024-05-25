import React, { useEffect } from 'react';
import useAccordionStore from '../../store/useAccordionStore';

export default function NaverMap() {
  const { isAccordionOpen } = useAccordionStore();

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=r1gni5e2d1';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10,
      };
      new window.naver.maps.Map('map', mapOptions);
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div
        id="map"
        className={`h-[800px] ${isAccordionOpen ? 'w-[1120px]' : 'w-[1520px]'}`}
      ></div>
    </div>
  );
}
