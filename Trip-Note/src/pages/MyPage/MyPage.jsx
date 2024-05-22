import React from 'react';
import Tabs from '../../components/Tabs/Tabs';
import { GoGear } from 'react-icons/go';

const MyPage = () => {
  return (
    <>
      <div className="max-w-7xl max-h-full mx-auto bg-white rounded-lg p-6 flex flex-col items-center">
        <img
          src="/profile.png"
          alt="기본 이미지"
          className="rounded-full w-20 h-20 object-cover mb-4"
        />
        <h3 className="text-5xl mb-4">userId</h3>

        <button className="text-sm font-bold mb-4 flex items-center">
          <GoGear className="mr-2" />
          프로필 관리
        </button>
        <Tabs
          tabCount={4}
          tabLabels={['내가 만든 경로', '찜한 경로', '나의 후기', '찜한 후기']}
        />
      </div>
    </>
  );
};

export default MyPage;
