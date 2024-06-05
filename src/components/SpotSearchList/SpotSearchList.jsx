import React from 'react';
import SpotCard from './SpotCard';
import useMapStore from '../../store/useMapStore';
import Input from '../commons/Input';

const spots = [
  {
    id: 2,
    location: '경복궁',
    imageUrl:
      'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/323M/image/Ldsfv84iiqXP4PIAph8UVgDYBrs.jpeg',
    region: 'SEOUL',
    address: '서울특별시 종로구 세종로 1-91 경복궁',
    lat: 37.5788407,
    lng: 126.9770162,
  },
  {
    id: 4,
    location: '광화문',
    imageUrl:
      'https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/700/14d64ff6b39cfb0477f381dcac36524f_res.jpeg',
    region: 'SEOUL',
    address: '서울특별시 종로구 세종로 1-57',
    lat: 37.5760259,
    lng: 126.9768428,
  },
  {
    id: 14,
    location: '낙산공원',
    imageUrl:
      'https://korean.visitseoul.net/comm/getImage?srvcId=MEDIA&parentSn=24652&fileTy=MEDIA&fileNo=1',
    region: 'SEOUL',
    address: '서울특별시 종로구 동숭동 산2-10',
    lat: 37.580477,
    lng: 127.007587,
  },
  {
    id: 1,
    location: '남산',
    imageUrl: 'https://image6.yanolja.com/leisure/dC0u98BeFbTx9VaY/w800',
    region: 'SEOUL',
    address: '서울특별시 용산구 용산동2가 산1-3',
    lat: 37.5512168,
    lng: 126.9882475,
  },
  {
    id: 9,
    location: '덕수궁',
    imageUrl:
      'http://dh.aks.ac.kr/Encyves/wiki/images/0/01/한글팀_덕수궁_중화전.jpg',
    region: 'SEOUL',
    address: '서울특별시 중구 정동 5-1 덕수궁',
    lat: 37.5660945,
    lng: 126.9749148,
  },
];

const SpotSearchList = () => {
  const setMarkers = useMapStore((state) => state.setMarkers);
  const setRoutes = useMapStore((state) => state.setRoutes);
  const setMockRoutes = useMapStore((state) => state.setMockRoutes);

  const handleSpotClick = (lat, lng, spot) => {
    setMarkers([{ latitude: lat, longitude: lng }]);
    if (spot.location === '낙산공원') {
      setMockRoutes();
    } else {
      setRoutes([spot]);
    }
  };

  return (
    <form className="relative mt-4 flex-col justify-center">
      <div className="pt-4 pb-4 pl-3">
        <Input variant="searchInput" placeholder="여행지를 검색해보세요!" />
      </div>
      {spots.map((spot) => (
        <SpotCard
          key={spot.id}
          spot={spot}
          onClick={() => handleSpotClick(spot.lat, spot.lng, spot)}
        />
      ))}
    </form>
  );
};

export default SpotSearchList;
