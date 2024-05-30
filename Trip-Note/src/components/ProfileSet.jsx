import React from 'react';
import { useNavigate } from 'react-router-dom';
import useProfileStore from '../store/useProfileStore';

const ProfileSet = () => {
  const navigate = useNavigate();
  const {
    email,
    nickname,
    isNicknameChanged,
    setNickname,
    resetNicknameChanged,
  } = useProfileStore();

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleSave = () => {
    // 저장 로직을 여기에 추가
    console.log('Profile saved:', { email, nickname });
    resetNicknameChanged();
  };

  const handleGoBack = () => {
    navigate('/mypage');
  };

  return (
    <div className="p-6 w-1/2 mx-auto border m-20 bg-white rounded-lg space-y-6">
      <h1 className="text-2xl mb-4">프로필 설정</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-subTitle ">이메일</label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full h-14 px-3 py-2 border border-gray-300 rounded-lg text-xl bg-gray-100 mb-4 text-gray-500"
          />
        </div>
        <div>
          <label className="block text-subTitle">닉네임</label>
          <input
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            className="w-full h-14 px-3 py-2 border border-gray-300 mb-4 text-xl rounded-lg"
          />
        </div>
        <div className="space-y-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={!isNicknameChanged}
            className={`w-full h-14 px-4 py-2 rounded-lg text-white  ${
              isNicknameChanged ? 'bg-prime' : 'bg-gray-300'
            }`}
          >
            저장
          </button>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleGoBack}
              className="w-1/2 h-14 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
            >
              돌아가기
            </button>
            <button
              type="button"
              className="w-1/2 h-14 px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              회원탈퇴
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileSet;
