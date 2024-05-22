import React from 'react';
import useProfileStore from '../store/store';

const Profile = () => {
  const { nickname, setNickname, resetNicknameChanged } = useProfileStore();

  // userId 값을 nickname으로 설정
  const userId = nickname;

  return (
    <>
      <img
        src="/profile.png"
        alt="기본 이미지"
        className="rounded-full w-20 h-20 object-cover mb-4"
      />
      <h3 className="text-5xl mb-4">{userId}</h3>
    </>
  );
};

export default Profile;
