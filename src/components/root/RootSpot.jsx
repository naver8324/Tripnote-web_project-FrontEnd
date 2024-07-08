import React, { useEffect, useState } from 'react';
import Button from '../../components/commons/Button';
import useHashTag from '../../Hooks/posts/useHashTag';
import SpotSearchList from '../SpotSearchList/SpotSearchList';
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
  const setCenter = useMapSpotStore((state) => state.setCenter);
  const { Hashtags: regionTags } = useHashTag(true);
  const [localRegionTags, setLocalRegionTags] = useState([]);
  const [selectedRegionName, setSelectedRegionName] = useState('서울');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const regionCode = regionMap[selectedRegionName] || 'SEOUL';

  useEffect(() => {
    const center = regionCenters[regionCode];
    if (center) {
      setCenter(center);
    }
  }, [regionCode, setCenter]);

  useEffect(() => {
    if (regionTags) {
      const filteredTags = regionTags.filter(
        (region) => region.name !== '전체',
      );
      const testTag = filteredTags.find((region) => region.name === 'test1');
      const otherTags = filteredTags.filter(
        (region) => region.name !== 'test1',
      );
      if (testTag) {
        setLocalRegionTags([...otherTags, testTag]);
      } else {
        setLocalRegionTags(otherTags);
      }
    }
  }, [regionTags]);

  const handleRegionClick = (region) => {
    setSelectedRegionName(region.name);
    setIsDropdownOpen(false); // 해시태그를 선택하면 드롭다운을 닫습니다.
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="p-4 pl-4 pr-0 w-full">
      <div className="flex justify-center">
        <Button
          onClick={toggleDropdown}
          variant="roundButton"
          size="small"
          className="text-xl px-3 mr-4 font-bold hover:bg-gray-300"
        >
          {isDropdownOpen ? '지역 선택 닫기' : `${selectedRegionName}`}
        </Button>
        <p className="flex items-center">
          {isDropdownOpen ? '' : `지역 클릭!`}
        </p>
      </div>
      {isDropdownOpen && (
        <div className="flex gap-3 flex-wrap mt-4">
          {localRegionTags.map((region) => (
            <Button
              variant="roundButton"
              size="small"
              key={region.id}
              className={`text-lg px-3 ${
                selectedRegionName === region.name
                  ? 'bg-gray-200'
                  : 'hover:bg-gray-300'
              }`}
              onClick={() => handleRegionClick(region)}
            >
              {region.name}
            </Button>
          ))}
        </div>
      )}
      <SpotSearchList region={regionCode} />
    </div>
  );
};

export default RootSpot;
