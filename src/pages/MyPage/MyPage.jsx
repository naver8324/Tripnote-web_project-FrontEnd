import React from 'react';
import Tabs from '../../components/Tabs/Tabs';
import MyRoot from '../../components/Mypage/MyRoot';
import LoverRoot from '../../components/Mypage/LoverRoot';
import MyReview from '../../components/Mypage/MyReview';
import LoverReview from '../../components/Mypage/LoverReview';
import Profile from '../../components/Profile';
import { useNavigate } from 'react-router-dom';
import { GoGear } from 'react-icons/go';
import Button from '../../components/commons/Button';

export default function MyPage() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    const provider = localStorage.getItem('provider');
    if (provider === 'kakao') {
      navigate('/mypage/socialprofile');
    } else {
      navigate('/mypage/checkedpassword');
    }
  };

  return (
    <div className="mt-40 min-h-[1200px] bg-white rounded-lg p-6 flex">
      {/* Left Section */}
      <div className="flex-grow">
        <Tabs>
          <Tabs.Tab index={0}>내 여행 경로</Tabs.Tab>
          <Tabs.Tab index={1}>북마크 여행 경로</Tabs.Tab>
          <Tabs.Tab index={2}>내 여행 경로 후기</Tabs.Tab>
          <Tabs.Tab index={3}>북마크 여행 후기</Tabs.Tab>

          <Tabs.TabContent index={0}>
            <MyRoot />
          </Tabs.TabContent>
          <Tabs.TabContent index={1}>
            <LoverRoot />
          </Tabs.TabContent>
          <Tabs.TabContent index={2}>
            <MyReview />
          </Tabs.TabContent>
          <Tabs.TabContent index={3}>
            <LoverReview />
          </Tabs.TabContent>
        </Tabs>
      </div>

      {/* Right Sidebar */}
      <aside className="w-64 ml-6 flex-shrink-0 p-8 flex flex-col items-center bg-subBackground rounded-xl h-[250px]">
        <Profile />
        <Button
          className="text-xl mt-4 flex items-center border-gray-400 bg-white shadow-sm"
          onClick={handleProfileClick}
        >
          <GoGear className="mr-2 text-2xl" />
          프로필 관리
        </Button>
      </aside>
    </div>
  );
}