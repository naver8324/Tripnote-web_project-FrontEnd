import { useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios';

const useOauth = () => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'GET',
    url: '/api/member/kakao',
    shouldFetch: false,
    showBoundary: true,
  });

  const kakaoLogin = async () => {
    try {
      await fetchData();
      // 응답 데이터를 사용하여 추가 처리를 수행합니다.
      console.log('Login successful:', responseData);
      // window.location.href = '/'; // 로그인 후 리디렉션할 경로
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return { kakaoLogin, loading, error };
};

export default useOauth;
