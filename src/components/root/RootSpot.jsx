import React, { useEffect } from 'react';
import SpotSearchList from '../SpotSearchList/SpotSearchList';
import useRegionSearchStore from '../../store/useRegionSearchStore';
import useMapSpotStore from '../../store/useMapSpotStore';

const regionMap = {
  서울: 'SEOUL',
  인천: 'INCHEON',
  부산: 'BUSAN',
  대구: 'DAEGU',
  울산: 'ULSAN',
  광주: 'GWANGJU',
  대전: 'DAEJEON',
  세종: 'SEJONG',
  경기: 'GYEONGGI',
  강원: 'GANGWON',
  충북: 'CHUNGBUK',
  충남: 'CHUNGNAM',
  경북: 'GYEONGBUK',
  경남: 'GYEONGNAM',
  전북: 'JEONBUK',
  전남: 'JEONNAM',
  제주: 'JEJU',
};

const regionCenters = {
  SEOUL: { latitude: 37.5665, longitude: 126.978 },
  INCHEON: { latitude: 37.4563, longitude: 126.7052 },
  BUSAN: { latitude: 35.1796, longitude: 129.0756 },
  DAEGU: { latitude: 35.8722, longitude: 128.6025 },
  ULSAN: { latitude: 35.5384, longitude: 129.3114 },
  GWANGJU: { latitude: 35.1595, longitude: 126.8526 },
  DAEJEON: { latitude: 36.3504, longitude: 127.3845 },
  SEJONG: { latitude: 36.4876, longitude: 127.2825 },
  GYEONGGI: { latitude: 37.4138, longitude: 127.5183 },
  GANGWON: { latitude: 37.8228, longitude: 128.1555 },
  CHUNGBUK: { latitude: 36.6356, longitude: 127.4914 },
  CHUNGNAM: { latitude: 36.5184, longitude: 126.8 },
  GYEONGBUK: { latitude: 36.576, longitude: 128.5056 },
  GYEONGNAM: { latitude: 35.4606, longitude: 128.2132 },
  JEONBUK: { latitude: 35.7175, longitude: 127.153 },
  JEONNAM: { latitude: 34.816, longitude: 126.4629 },
  JEJU: { latitude: 33.4996, longitude: 126.5312 },
};

const RootSpot = () => {
  const selectedRegion = useRegionSearchStore((state) => state.selectedRegion);
  const setCenter = useMapSpotStore((state) => state.setCenter);
  const regionCode = regionMap[selectedRegion] || 'SEOUL';

  useEffect(() => {
    const center = regionCenters[regionCode];
    if (center) {
      setCenter(center);
    }
  }, [regionCode, setCenter]);

  return (
    <>
      <SpotSearchList region={regionCode} />
    </>
  );
};

export default RootSpot;
