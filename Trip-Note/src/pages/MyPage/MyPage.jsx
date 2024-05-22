import React from 'react';
import Tabs from '../../components/Tabs/Tabs';

const MyPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
        <img
          src="/profile.png"
          alt="기본 이미지"
          className="rounded-full w-24 h-24 object-cover mb-4"
        />
        <button className="text-sm font-bold mb-2">프로필 관리</button>
        {/* 여행 계획 내용 추가 */}
      </div>
      <Tabs
        tabCount={4}
        tabLabels={['내가 만든 경로', '찜한 경로', '나의 후기', '찜한 후기']}
      />
    </div>
  );
};

export default MyPage;
