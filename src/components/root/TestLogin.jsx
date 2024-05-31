import React, { useEffect } from 'react';
import axios from 'axios';

const TestLogin = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://34.64.39.102:8080/login', {
          email: 'test55@test.com',
          password: 'test1234',
        });

        // 응답에서 Authorization 헤더의 값을 추출
        const accessToken = response.headers.authorization;

        // 추출한 토큰을 로컬 스토리지에 저장
        localStorage.setItem('accessToken', accessToken);
        console.log(accessToken);
        console.log('Login successful');
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return <div>{/* 컴포넌트 내용 작성 */}</div>;
};

export default TestLogin;
