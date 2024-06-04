import React, { useState } from 'react';
import NaverMap from './NaverMap';

// 예시 위치 데이터, 실제 사용시에는 동적 데이터로 대체 가능
const locationData = {
  photo1: [
    { latitude: 37.566535, longitude: 126.977969 }, // 위치 1
    { latitude: 37.5642135, longitude: 127.0016985 }, // 위치 2
    { latitude: 37.551229, longitude: 126.988205 }, // 위치 3
  ],
  photo2: [
    { latitude: 37.579617, longitude: 126.977041 }, // 위치 1
    { latitude: 37.575929, longitude: 126.973014 }, // 위치 2
    { latitude: 37.570362, longitude: 126.992043 }, // 위치 3
  ],
  // 추가 사진과 위치들...
};

function PhotoMap() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // 사진 클릭 핸들러
  const handlePhotoClick = (photoKey) => {
    setSelectedPhoto(photoKey);
  };

  return (
    <div>
      {Object.keys(locationData).map((photoKey) => (
        <button key={photoKey} onClick={() => handlePhotoClick(photoKey)}>
          {photoKey}
        </button>
      ))}
      {selectedPhoto && (
        <NaverMap
          className="w-[800px] h-screen" // 맵을 전체 화면으로 보여주기 위한 CSS 클래스
          markers={locationData[selectedPhoto]}
        />
      )}
    </div>
  );
}

export default PhotoMap;
