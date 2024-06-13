import React, { useState, useEffect } from 'react';
import Button from '../../components/commons/Button';
import useHashTag from '../../Hooks/posts/useHashTag';

const regionNameMapping = {
  서울: 'seoul',
  부산: 'busan',
  대구: 'daegu',
  인천: 'incheon',
  광주: 'gwangju',
  대전: 'daejeon',
  울산: 'ulsan',
  세종: 'sejong',
  경기: 'gyeonggi',
  강원: 'gangwon',
  충북: 'chungbuk',
  충남: 'chungnam',
  경북: 'gyeongbuk',
  경남: 'gyeongnam',
  전북: 'jeonbuk',
  전남: 'jeonnam',
  제주: 'jeju',
};

const regionCenters = {
  seoul: { latitude: 37.5665, longitude: 126.978 },
  busan: { latitude: 35.1796, longitude: 129.0756 },
  daegu: { latitude: 35.8722, longitude: 128.6025 },
  incheon: { latitude: 37.4563, longitude: 126.7052 },
  gwangju: { latitude: 35.1595, longitude: 126.8526 },
  daejeon: { latitude: 36.3504, longitude: 127.3845 },
  ulsan: { latitude: 35.5384, longitude: 129.3114 },
  sejong: { latitude: 36.4876, longitude: 127.2825 },
  gyeonggi: { latitude: 37.4138, longitude: 127.5183 },
  gangwon: { latitude: 37.8228, longitude: 128.1555 },
  chungbuk: { latitude: 36.6356, longitude: 127.4914 },
  chungnam: { latitude: 36.5184, longitude: 126.8 },
  gyeongbuk: { latitude: 36.576, longitude: 128.5056 },
  gyeongnam: { latitude: 35.4606, longitude: 128.2132 },
  jeonbuk: { latitude: 35.7175, longitude: 127.153 },
  jeonnam: { latitude: 34.816, longitude: 126.4629 },
  jeju: { latitude: 33.4996, longitude: 126.5312 },
};

export default function RootArea({ onSelectRegion }) {
  const { Hashtags: regionTags } = useHashTag(true);
  const [localRegionTags, setLocalRegionTags] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('서울');

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

  useEffect(() => {
    if (selectedRegion) {
      const regionKey = regionNameMapping[selectedRegion];
      if (regionKey) {
        const regionCenter = regionCenters[regionKey];
        onSelectRegion(regionKey, regionCenter);
      } else {
        console.error('Region key not found for:', selectedRegion);
      }
    }
  }, [selectedRegion, onSelectRegion]);

  const handleRegionClick = (region) => {
    setSelectedRegion(region.name);
  };

  return (
    <div className="p-4 w-full">
      <h1 className="text-lg font-medium mb-8 mt-5">지역을 선택해주세요</h1>
      <div className="flex gap-3 flex-wrap">
        {localRegionTags.map((region) => (
          <Button
            variant="roundButton"
            size="small"
            key={region.id}
            className={`text-lg px-3 ${
              selectedRegion === region.name
                ? 'bg-gray-200'
                : 'hover:bg-gray-300'
            }`}
            onClick={() => handleRegionClick(region)}
          >
            #{region.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
