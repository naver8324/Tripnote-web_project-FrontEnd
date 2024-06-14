import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/useUserStore';
import useMemberInfo from '../../Hooks/user/useMemberInfo';
import useInfoUpdate from '../../Hooks/user/useInfoUpdate';
import useCheckNickname from '../../Hooks/user/useCheckNickname';
import useDeleteMember from '../../Hooks/user/useDeleteMember';
import { ToastAlert } from '../../components/commons/ToastAlert';

const SocialProfilePage = () => {
  const navigate = useNavigate();
  const email = useUserStore((state) => state.email);
  const nickname = useUserStore((state) => state.nickname);
  const setEmail = useUserStore((state) => state.setEmail);
  const setNickname = useUserStore((state) => state.setNickname);
  const resetUser = useUserStore((state) => state.resetUser);
  const [errors, setErrors] = useState({ nickname: '' });
  const [nicknameError, setNicknameError] = useState('');
  const [nicknameLoading, setNicknameLoading] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const { memberInfo } = useMemberInfo();
  const { updateInfo } = useInfoUpdate();
  const { deleteMember, loading: deleteLoading } = useDeleteMember();
  const {
    checkNickname,
    loading: CheckNicknameLoading,
    error: CheckNicknameError,
  } = useCheckNickname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await memberInfo();
        setEmail(data.email);
        setNickname(data.nickname);
      } catch (err) {
        console.error('Error fetching member info:', err);
      }
    };

    fetchData();
  }, [setEmail, setNickname]);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setIsNicknameChecked(false);
    if (e.target.value.length < 2) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nickname: '닉네임은 2글자 이상이어야 합니다.',
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, nickname: '' }));
    }
  };

  const handleCheckNickname = async () => {
    setNicknameLoading(true);
    setNicknameError(' ');
    try {
      if (nickname.length < 2 || nickname.length > 10) {
        setNicknameError('닉네임은 2글자 이상 10글자 이하이어야 합니다.');
        setNicknameLoading(false);
        return false;
      }

      const response = await checkNickname(nickname);

      if (response === true) {
        setNicknameError('이미 사용 중인 닉네임입니다.');
        setNicknameLoading(false);
        return false;
      } else {
        setNicknameError('사용 가능한 닉네임입니다.');
        setNicknameLoading(false);
        setIsNicknameChecked(true);
        return true;
      }
    } catch (error) {
      console.error('Error while checking nickname:', error);
      setNicknameError('닉네임 확인 중 오류가 발생했습니다.');
      setNicknameLoading(false);
      return false;
    }
  };

  const handleSave = async () => {
    const data = {
      newNickname: nickname,
    };
    try {
      await updateInfo(data);

      await memberInfo();
      setNickname(nickname);
      ToastAlert('정보 수정이 완료되었습니다.', 'success');
      resetUser();
      navigate('/mypage');
    } catch (err) {
      console.error('Error saving profile:', err);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('정말로 회원 탈퇴하시겠습니까?')) {
      try {
        await deleteMember();
        ToastAlert('회원 탈퇴가 완료되었습니다.', 'success');
      } catch (err) {
        console.error('Error deleting member:', err);
      }
    }
  };

  const handleGoBack = () => {
    navigate('/mypage');
  };

  const isFormValid = () => {
    return isNicknameChecked && nickname.length >= 2;
  };

  return (
    <div className="mt-40 mb-40 w-[1000px]">
      <div className="p-6 w-1/2 mx-auto border m-20 bg-white rounded-lg space-y-6">
        <h1 className="text-2xl mb-4">프로필 설정</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-subTitle">이메일</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full h-14 px-3 py-2 border border-gray-300 rounded-lg text-xl bg-gray-100 mb-4 text-gray-500"
            />
          </div>
          <div className="pb-8">
            <label className="block text-subTitle">닉네임</label>
            <div className="flex items-center ">
              <input
                type="text"
                value={nickname}
                onChange={handleNicknameChange}
                className="w-3/4 h-14 px-3 py-2 border border-gray-300 text-xl rounded-lg"
              />
              <button
                type="button"
                onClick={handleCheckNickname}
                disabled={nicknameLoading || isNicknameChecked}
                className={`w-1/4 h-14 px-4 py-2 ml-2 ${
                  isNicknameChecked ? 'bg-gray-400' : 'bg-prime'
                } text-white rounded-lg`}
              >
                확인
              </button>
            </div>
            {errors.nickname && (
              <p className="text-red-500">{errors.nickname}</p>
            )}
            {nicknameError && (
              <p
                className={`text-${
                  nicknameError.includes('사용 가능한') ? 'prime' : 'red-500'
                }`}
              >
                {nicknameError}
              </p>
            )}
          </div>
          <div className="space-y-4">
            <button
              type="button"
              onClick={handleSave}
              disabled={!isFormValid()}
              className={`w-full h-14 px-4 py-2 rounded-lg text-white ${
                isFormValid() ? 'bg-prime' : 'bg-gray-300'
              }`}
            >
              저장
            </button>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleGoBack}
                className="w-1/2 h-14 px-4 py-2 bg-gray-400 text-white rounded-lg"
              >
                돌아가기
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                className="w-1/2 h-14 px-4 py-2 bg-red-500 text-white rounded-lg"
                disabled={deleteLoading}
              >
                회원탈퇴
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SocialProfilePage;
