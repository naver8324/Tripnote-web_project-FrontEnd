import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InfoInput from '../../components/commons/InfoInput';
import GhostButton from '../../components/commons/GhostButton';
import useSignup from '../../Hooks/user/useSignup';
import { ToastAlert } from '../../components/commons/ToastAlert';
import EmailVerification from '../../components/Email/EmailVerification';
import useCheckNickname from '../../Hooks/user/useCheckNickname.js';

export default function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [nicknameErrorColor, setNicknameErrorColor] = useState('red-500');
  const [emailError, setEmailError] = useState('');
  const [emailErrorColor, setEmailErrorColor] = useState('red-500');
  const [isVerified, setIsVerified] = useState(false); // 이메일 인증 상태 추가
  const [isNicknameChecked, setIsNicknameChecked] = useState(false); // 닉네임 확인 상태 추가
  const { signup, loading, error } = useSignup();
  const {
    checkNickname,
    loading: CheckNicknameLoading,
    error: CheckNicknameError,
  } = useCheckNickname();

  const [nicknameLoading, setNicknameLoading] = useState(false);
  const [nicknameCheckError, setNicknameCheckError] = useState('');

  const redirectUrl =
    new URLSearchParams(location.search).get('redirecturl') || '/';

  const handleCheckNickname = async () => {
    setNicknameLoading(true);
    setNicknameCheckError('');
    try {
      if (nickname.length < 2 || nickname.length > 10) {
        setNicknameError('닉네임은 2글자 이상 10글자 이하이어야 합니다.');
        setNicknameErrorColor('red-500');
        setNicknameLoading(false);
        setIsNicknameChecked(false);
        return false;
      }

      const response = await checkNickname(nickname);

      if (response === true) {
        setNicknameError('이미 사용 중인 닉네임입니다.');
        setNicknameErrorColor('red-500');
        setNicknameLoading(false);
        setIsNicknameChecked(false);
        return false;
      } else {
        setNicknameError('사용 가능한 닉네임입니다.');
        setNicknameErrorColor('prime');
        setNicknameLoading(false);
        setIsNicknameChecked(true); // 닉네임 확인 완료
        return true;
      }
    } catch (error) {
      console.error('Error while checking nickname:', error);
      setNicknameError('닉네임 확인 중 오류가 발생했습니다.');
      setNicknameErrorColor('red-500');
      setNicknameLoading(false);
      setNicknameCheckError(error.message);
      setIsNicknameChecked(false);
      return false;
    }
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setIsNicknameChecked(false); // 닉네임 변경 시 확인 상태 초기화
  };

  const handleSignup = async () => {
    // 닉네임 중복 확인
    const isNicknameAvailable = await handleCheckNickname();
    if (!isNicknameAvailable) {
      return;
    }

    // 비밀번호 확인
    if (password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 비밀번호 형식 검증
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('비밀번호는 영문과 숫자를 포함하여 8~20자여야 합니다.');
      return;
    }

    // 이메일 인증 확인
    if (!isVerified) {
      setEmailError('이메일 인증이 필요합니다.');
      setEmailErrorColor('red-500');
      return;
    }

    try {
      // 회원가입 요청
      await signup(email, password, nickname);
      ToastAlert('회원가입이 완료되었습니다.', 'success');

      navigate(`/login?redirecturl=${redirectUrl}`);
    } catch (error) {
      console.error('Signup failed:', error);
      setPasswordError('가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="m-56 w-[480px]">
      <div className="">
        <p className="text-3xl mb-8">회원가입</p>
        <EmailVerification
          email={email}
          setEmail={setEmail}
          setIsVerified={setIsVerified}
        />{' '}
        {/* EmailVerification 컴포넌트 사용 */}
        <label htmlFor="nickname" className="mt-6 text-subTitle block mb-1">
          닉네임
        </label>
        <div className="flex justify-between items-center">
          <div className="w-3/4 mr-2">
            <input
              id="nickname"
              type="text"
              className="w-full h-14 p-2 border border-gray-300 rounded-lg"
              value={nickname}
              onChange={handleNicknameChange}
            />
          </div>
          <button
            className={`w-1/4 h-14 ${isNicknameChecked ? 'bg-gray-400' : 'bg-prime'} text-white p-2 rounded-lg`}
            onClick={handleCheckNickname}
            disabled={nicknameLoading || isNicknameChecked}
          >
            확인
          </button>
        </div>
        {nicknameError && (
          <p className={`mb-6 text-500 text-${nicknameErrorColor}`}>
            {nicknameError}
          </p>
        )}
        {nicknameCheckError && (
          <p className="text-red-500">닉네임 확인 중 오류가 발생했습니다.</p>
        )}
        <div className="mt-6 mb-4">
          <InfoInput
            title="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-0"
          />
        </div>
        <div className="">
          <InfoInput
            title="비밀번호 확인"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
        {passwordError && <p className="mb-4 text-red-500">{passwordError}</p>}
        {loading && <p>가입 중...</p>}
        {error && <p className="text-red-500">가입 실패: {error.message}</p>}
        <GhostButton
          title="가입하기"
          className={'mt-6'}
          onClick={handleSignup}
          disabled={!isVerified || nicknameLoading || !isNicknameChecked} // 이메일 인증 완료되기 전까지 비활성화
        />
        <div className="text-center">
          <Link
            to="/login"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            로그인 화면으로 가기
          </Link>
        </div>
      </div>
    </div>
  );
}
