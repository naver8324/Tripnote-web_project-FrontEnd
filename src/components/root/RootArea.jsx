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

export default function RootArea({ onSelectRegion }) {
  const { Hashtags: regionTags } = useHashTag(true);
  const [localRegionTags, setLocalRegionTags] = useState([]);

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
    if (typeof onSelectRegion === 'function') {
      const regionKey = regionNameMapping[region.name];
      if (regionKey) {
        onSelectRegion(regionKey);
      } else {
        console.error('Region key not found for:', region.name);
      }
    } else {
      console.error('onSelectRegion is not a function');
    }
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
            className="text-lg px-3 hover:bg-gray-300"
            onClick={() => handleRegionClick(region)}
          >
            #{region.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
