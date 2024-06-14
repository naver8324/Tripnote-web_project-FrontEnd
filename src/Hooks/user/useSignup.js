import React, { useState } from 'react';
import useAxios from '../useAxios';

const useSignup = () => {
  const { responseData, error, loading, fetchData } = useAxios({
    method: 'POST',
    url: '/api/member/signup',
    shouldFetch: false,
  });

  const signup = async (email, password, nickname) => {
    try {
      const response = await fetchData({
        data: { email, password, nickname },
      });

      return response.data;
    } catch (err) {
      console.error('Signup failed:', err);
      throw err; // 필요한 경우 호출자에게 에러 전파
    }
  };

  return { signup, responseData, loading, error };
};

export default useSignup;
