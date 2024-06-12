import React, { useState, useEffect } from 'react';
import Button from '../../components/commons/Button';
import useHashTag from '../../Hooks/posts/useHashTag';

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
      onSelectRegion(region.name);
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
