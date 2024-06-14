import React from 'react';
import profile from '../assets/profile.png';

const Profile = () => {
  const nickname = localStorage.getItem('userNickname');
  const email = localStorage.getItem('userEmail');

  return (
    <div className="flex space-x-2 flex-col justify-center items-center">
      <img
        src={profile}
        alt="기본 이미지"
        className="rounded-full w-12 h-12 object-cover mb-4"
      />
      <div>
        <h3 className="text-4xl mb-2">{nickname}</h3>
      </div>
      <div className="text-2xl mb-2">{email}</div>
    </div>
  );
};

export default Profile;
