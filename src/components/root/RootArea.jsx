import React, { useState, useEffect } from 'react';
import Button from '../../components/commons/Button';
import useHashTag from '../../Hooks/posts/useHashTag';

export default function RootArea({ onSelectRegion }) {
  const { Hashtags: regionTags } = useHashTag(true); // 지역별 후기 태그를 가져옴
  const [localRegionTags, setLocalRegionTags] = useState([]);

  useEffect(() => {
    if (regionTags) {
      setLocalRegionTags(regionTags);
    }
  }, [regionTags]);

  const handleRegionClick = (region) => {
    onSelectRegion(region.name.toUpperCase()); // 선택된 지역을 소문자로 변환하여 부모 컴포넌트로 전달
  };

  return (
    <div className="p-4 w-full">
      <h1 className="text-lg font-medium mb-8 mt-5 ">지역을 선택해주세요</h1>
      <div className="flex gap-3 flex-wrap">
        {localRegionTags.map((region) => (
          <Button
            variant="roundButton"
            size="small"
            key={region.id}
            className="text-lg px-3 hover:bg-gray-300" // hover 효과 추가
            onClick={() => handleRegionClick(region)}
          >
            #{region.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
