import React from 'react';
import { useNavigate } from 'react-router-dom';
import Tabs from '../../components/Tabs/Tabs';
import { GoGear } from 'react-icons/go';
import MyRoot from '../../components/Tabs/MyRoot';
import LoverRoot from '../../components/Tabs/LoverRoot';
import MyReview from '../../components/Tabs/MyReview';
import LoverReview from '../../components/Tabs/LoverReview';
import Profile from '../../components/Profile';

const MyPage = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/mypage/profile');
  };
  return (
    <>
      <div className="bg-white rounded-lg p-6 flex flex-col items-center">
        <Profile />
        <button
          className="text-lg mb-4 flex items-center"
          onClick={handleProfileClick}
        >
          <GoGear className="mr-2" />
          프로필 관리
        </button>
        <Tabs
          tabCount={4}
          tabLabels={[
            '나의 여행 루트',
            '찜한 여행 루트',
            '나의 여행 후기',
            '찜한 여행 후기',
          ]}
        >
          <MyRoot />
          <LoverRoot />
          <MyReview />
          <LoverReview />
        </Tabs>
      </div>
    </>
  );
};

export default MyPage;
