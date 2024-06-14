import React, { useState, useEffect } from 'react';
import useSendEmail from '../../Hooks/email/useSendEmail';
import useCheckedEmail from '../../Hooks/email/useCheckedEmail';
import { ToastAlert } from '../commons/ToastAlert';
import useDuplicateCheckEmail from '../../Hooks/user/useDuplicateCheckEmail.js';
import useFindPassword from '../../Hooks/email/useFindPassword.js';

const FindPassword = ({ email, setEmail, isVerified, setIsVerified }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [emailError, setEmailError] = useState('');
  const [emailErrorColor, setEmailErrorColor] = useState('red-500');
  const {
    duplicateCheckEmail,
    loading: duplicateCheckEmailLoading,
    error: duplicateCheckEmailError,
  } = useDuplicateCheckEmail();
  const { SendEmail, loading: sendLoading, error: sendError } = useSendEmail();
  const {
    checkEmail,
    loading: checkLoading,
    error: checkError,
  } = useCheckedEmail();
  const {
    findPassword,
    loading: findPasswordLoading,
    error: findPasswordError,
  } = useFindPassword();

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

  const handleCheckEmail = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
      setEmailErrorColor('red-500');
      return;
    }
    try {
      const response = await duplicateCheckEmail(email);
      if (response === false) {
        setEmailError('존재하지 않는 이메일입니다.');
        setEmailErrorColor('red-500');
      } else {
        // 인증번호 발송
        ToastAlert('이메일 인증번호를 전송중입니다.', 'info');
        const emailResponse = await SendEmail(email);

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

        //새로운 비밀번호 이메일 보내기
        try {
          const result = await findPassword(email, verificationCode);
          if (result) {
            ToastAlert(
              `새로운 비밀번호가 ${email} 로 전달되었습니다.`,
              'success',
            );
          }
        } catch (err) {
          console.error('Error reset password:', err);
          setEmailError(
            '새로운 비밀번호를 이메일로 전달하는 도중 오류가 발생했습니다.',
          );
          setEmailErrorColor('red-500');
        }
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

  return (
    <div>
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
            disabled={emailError === '이메일 인증이 완료되었습니다.'}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          className={`w-1/4 h-14 bg-prime text-white p-2 rounded-lg ${
            (emailError === '이메일 인증이 완료되었습니다.'
              ? 'bg-gray-500 text-white'
              : 'bg-prime text-white',
            verificationSent ? '' : 'text-sm')
          }`}
          disabled={emailError === '이메일 인증이 완료되었습니다.'}
          onClick={handleCheckEmail}
        >
          {verificationSent ? '재전송' : '인증번호 전송'}
        </button>
      </div>
      {emailError && (
        <p className={`mb-6 text-500 text-${emailErrorColor}`}>{emailError}</p>
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
                timer === 0 ? 'bg-gray-500 text-white' : 'bg-prime text-white'
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
    </div>
  );
};

export default FindPassword;
