import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/useUserStore';
import useMemberInfo from '../Hooks/user/useMemberInfo';
import useInfoUpdate from '../Hooks/user/useInfoUpdate'; // 새로운 훅 임포트
import { toast } from 'react-toastify';
import { ToastAlert } from './commons/ToastAlert';

const ProfileSet = () => {
  const navigate = useNavigate();
  const email = useUserStore((state) => state.email);
  const nickname = useUserStore((state) => state.nickname);
  const setEmail = useUserStore((state) => state.setEmail);
  const setNickname = useUserStore((state) => state.setNickname);
  const resetUser = useUserStore((state) => state.resetUser);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ nickname: '', password: '' });
  const { memberInfo } = useMemberInfo();
  const { updateInfo } = useInfoUpdate(); // 새로운 훅 사용

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
    if (e.target.value.length < 2) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nickname: '닉네임은 2글자 이상이어야 합니다.',
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, nickname: '' }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: '비밀번호는 영문과 숫자를 포함하여 8~20자여야 합니다.',
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: '비밀번호가 일치하지 않습니다.',
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
    }
  };

  const handleSave = async () => {
    const data = {
      nickname,
    };
    if (password.length >= 8) {
      data.password = password;
    }
    try {
      await updateInfo(data);
      ToastAlert('정보 수정이 완료되었습니다.', 'success');
      console.log('Profile saved:', data);
      resetUser();
      navigate('/mypage');
    } catch (err) {
      console.error('Error saving profile:', err);
    }
  };

  const handleGoBack = () => {
    navigate('/mypage');
  };

  const isFormValid = () => {
    return (
      nickname.length >= 2 &&
      (password.length === 0 || password.length >= 8) &&
      (password.length === 0 || password === confirmPassword)
    );
  };

  return (
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
        <div>
          <label className="block text-subTitle">닉네임</label>
          <input
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            className="w-full h-14 px-3 py-2 border border-gray-300 mb-4 text-xl rounded-lg"
          />
          {errors.nickname && <p className="text-red-500">{errors.nickname}</p>}
        </div>
        <div>
          <label className="block text-subTitle">비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full h-14 px-3 py-2 border border-gray-300 mb-4 text-xl rounded-lg"
          />
        </div>
        <div>
          <label className="block text-subTitle">비밀번호 확인</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="w-full h-14 px-3 py-2 border border-gray-300 mb-4 text-xl rounded-lg"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
        <div className="space-y-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={!isFormValid()}
            className={`w-full h-14 px-4 py-2 rounded-lg text-white ${isFormValid() ? 'bg-prime' : 'bg-gray-300'}`}
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
