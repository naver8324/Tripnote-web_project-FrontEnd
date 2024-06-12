import React from 'react';
import useUserStore from '../store/useUserStore';
import profile from '../assets/profile.png';

const Profile = () => {
  const nickname = localStorage.getItem('userNickname');

  // userId 값을 nickname으로 설정
  const userId = nickname;

  return (
    <div className='flex space-x-2'>
      <img
        src={profile}
        alt="기본 이미지"
        className="rounded-full w-8 h-8 object-cover mb-4"
      />
      <h3 className="text-2xl mb-2">{userId}</h3>
    </div>
  );
};

export default Profile;
