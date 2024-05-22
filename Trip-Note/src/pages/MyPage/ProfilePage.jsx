import React from 'react';
import Profile from '../../components/Profile';
import ProfileSet from '../../components/ProfileSet';

const ProfilePage = () => {
  return (
    <div className="ma-w-full bg-white rounded-lg p-6 flex flex-col items-center justify-center">
      <ProfileSet />
    </div>
  );
};

export default ProfilePage;
