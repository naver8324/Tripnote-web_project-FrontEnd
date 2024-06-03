import React, { useState } from 'react';
import api from '../../utils/api';

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = async (email, password, nickname) => {
    setLoading(true);
    setError(null);

    try {
      // 회원가입 요청 보내기
      const response = await api.post('/api/member/signup', {
        email,
        password,
        nickname,
      });

      // 응답 처리
      console.log('Signup successful:', response.data);
      // 회원가입이 성공하면 추가 작업을 수행할 수 있습니다.

      return response.data; // 이 예제에서는 응답 데이터를 반환합니다.
    } catch (err) {
      console.error('Signup failed:', err);
      setError(err); // 에러 상태 업데이트
      throw err; // 필요한 경우 호출자에게 에러 전파
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error };
};

export default useSignup;
