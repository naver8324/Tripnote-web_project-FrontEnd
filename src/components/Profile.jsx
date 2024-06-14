import React from 'react';
import profile from '../assets/profile.png';

const Profile = () => {
  const nickname = localStorage.getItem('userNickname');
  const email = localStorage.getItem('userEmail');

  return (
    <div className="flex space-x-2 flex-col justify-center items-center">
      <div className='flex justify-center items-center space-x-2'>
        <img
          src={profile}
          alt="기본 이미지"
          className="rounded-full w-8 h-8 object-cover"
        />

          <h3 className="text-2xl mb-2">{nickname}</h3>

      </div>
      <div className="text-xl mb-2">{email}</div>
    </div>
  );
};

export default Profile;
