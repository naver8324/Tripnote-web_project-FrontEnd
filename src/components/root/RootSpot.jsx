import React from 'react';
import SpotSearchList from '../SpotSearchList/SpotSearchList';
import useRegionSearchStore from '../../store/useRegionSearchStore';

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

const RootSpot = () => {
  const selectedRegion = useRegionSearchStore((state) => state.selectedRegion);
  const regionCode = regionMap[selectedRegion] || 'SEOUL';

  return (
    <>
      <SpotSearchList region={regionCode} />
    </>
  );
};

export default RootSpot;
