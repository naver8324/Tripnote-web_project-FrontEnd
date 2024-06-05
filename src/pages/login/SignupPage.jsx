import { Link } from 'react-router-dom';
import InfoInput from '../../components/commons/InfoInput';
import GhostButton from '../../components/commons/GhostButton';
import useSignup from '../../Hooks/user/useSignup';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastAlert } from '../../components/commons/ToastAlert';
import useSendEmail from '../../Hooks/email/useSendEmail';
import useCheckedEmail from '../../Hooks/email/useCheckedEmail';

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
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isVerified, setIsVerified] = useState(false); // 이메일 인증 상태 추가
  const { signup, loading, error } = useSignup();
  const { SendEmail, loading: sendLoading, error: sendError } = useSendEmail();
  const {
    checkEmail,
    loading: checkLoading,
    error: checkError,
  } = useCheckedEmail();

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [timer]);

  const handleCheckNickname = async () => {
    try {
      if (nickname.length < 2 || nickname.length > 10) {
        setNicknameError('닉네임은 2글자 이상 10글자 이하이어야 합니다.');
        setNicknameErrorColor('red-500');
        return;
      }
      const response = await axios.get(
        `http://34.64.39.102:8080/api/member/check-nickname?nickname=${nickname}`,
      );
      if (response.data) {
        setNicknameError('이미 사용 중인 닉네임입니다.');
        setNicknameErrorColor('red-500');
      } else {
        setNicknameError('사용 가능한 닉네임입니다.');
        setNicknameErrorColor('prime');
      }
    } catch (error) {
      console.error('Error while checking nickname:', error);
      setNicknameError('닉네임 확인 중 오류가 발생했습니다.');
      setNicknameErrorColor('red-500');
    }
  };

  const handleCheckEmail = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
      setEmailErrorColor('red-500');
      return;
    }
    try {
      const response = await axios.get(
        `http://34.64.39.102:8080/api/member/check-email?email=${email}`,
      );
      if (response.data) {
        setEmailError('이미 사용 중인 이메일입니다.');
        setEmailErrorColor('red-500');
      } else {
        setEmailError('사용 가능한 이메일입니다.');
        setEmailErrorColor('prime');

        // 인증번호 발송
        ToastAlert('이메일 인증번호를 전송중입니다.', 'info');
        await SendEmail(email);

        setVerificationSent(true);
        setTimer(180); // 3분 카운트다운
      }
    } catch (error) {
      console.error('Error while checking email:', error);
      setEmailError('이메일 확인 중 오류가 발생했습니다.');
      setEmailErrorColor('red-500');
    }
  };

  const handleVerifyCode = async () => {
    try {
      const result = await checkEmail(email, verificationCode);
      if (result) {
        ToastAlert('이메일 인증이 완료되었습니다.', 'success');
        setEmailError('이메일 인증이 완료되었습니다.');
        setEmailErrorColor('prime');
        setTimer(0); // 타이머 멈추기
        setIsVerified(true); // 인증 완료 상태 업데이트
      } else {
        setEmailError('인증번호가 올바르지 않습니다.');
        setEmailErrorColor('red-500');
      }
    } catch (error) {
      console.error('Error while verifying code:', error);
      setEmailError('인증번호 확인 중 오류가 발생했습니다.');
      setEmailErrorColor('red-500');
    }
  };

  const handleSignup = async () => {
    console.log('가입하기 클릭됨');
    // 닉네임 중복 확인
    await handleCheckNickname();

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

      console.log('Signup successful, navigating to login');
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
      setPasswordError('가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="m-56 w-[480px]">
      <div className="">
        <p className="text-3xl mb-8">회원가입</p>
        <label htmlFor="email" className="text-subTitle block mb-1">
          이메일
        </label>
        <div className="flex justify-between items-center">
          <div className="w-3/4 mr-2">
            <input
              id="email"
              type="email"
              className="w-full h-14 p-2 border border-gray-300 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            className={`w-1/4 h-14 bg-prime text-white p-2 rounded-lg ${
              isVerified === true
                ? 'bg-gray-400 text-gray-600'
                : 'bg-prime text-white'
            }`}
            disabled={isVerified === true}
            onClick={handleCheckEmail}
          >
            {verificationSent ? '재전송' : '인증번호 전송'}
          </button>
        </div>
        {emailError && (
          <p className={`mb-6 text-500 text-${emailErrorColor}`}>
            {emailError}
          </p>
        )}
        {verificationSent && (
          <div>
            <label
              htmlFor="verificationCode"
              className="text-subTitle block mb-1"
            >
              인증번호
            </label>
            <div className="flex justify-between items-center">
              <div className="w-3/4 mr-2">
                <input
                  id="verificationCode"
                  type="text"
                  className="w-full h-14 p-2 border border-gray-300 rounded-lg"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  disabled={timer === 0}
                />
              </div>
              <button
                className={`w-1/4 h-14 p-2 rounded-lg ${
                  timer === 0
                    ? 'bg-gray-400 text-gray-600'
                    : 'bg-prime text-white'
                }`}
                onClick={handleVerifyCode}
                disabled={timer === 0}
              >
                확인
              </button>
            </div>
            <p className="mb-4">
              {`남은 시간: ${Math.floor(timer / 60)}분 ${timer % 60}초`}
            </p>
          </div>
        )}
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
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <button
            className="w-1/4 h-14 bg-prime text-white p-2 rounded-lg"
            onClick={handleCheckNickname}
          >
            확인
          </button>
        </div>
        {nicknameError && (
          <p className={`mb-6 text-500 text-${nicknameErrorColor}`}>
            {nicknameError}
          </p>
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
          disabled={!isVerified} // 이메일 인증 완료되기 전까지 비활성화
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
