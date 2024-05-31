import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from './useAxios'; // useAxios 파일 임포트

const useLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useAxios 훅 사용
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'POST',
    url: '/login', // 상대 경로만 입력하여 요청 보냄
    data: {
      email,
      password,
    },
    shouldFetch: false, // 필요할 때 수동으로 fetchData() 호출
  });

  // 로그인 버튼 클릭 핸들러
  const handleLoginClick = async () => {
    // fetchData() 호출
    await fetchData();
    if (responseData) {
      // 로그인 성공 시, 원하는 페이지로 이동
      navigate('/dashboard'); // 예시: 대시보드 페이지로 이동
    } else {
      // 로그인 실패 시, 에러 메시지 표시
      alert('로그인 실패: ' + error);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleLoginClick,
  };
};

export default useLogin;
