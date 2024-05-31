import React, { useEffect } from 'react';
import api from '../../utils/api'; // axios 인스턴스를 가져옵니다.

const TestuseLogin = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.post('/login', {
          // api 인스턴스를 사용하여 요청을 보냅니다.
          email: 'test55@test.com',
          password: 'test1234',
        });

        const accessToken = response.headers.authorization;
        localStorage.setItem('accessToken', accessToken);
        
        console.log('Login successful');
        console.log(accessToken);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return <div>{/* 컴포넌트 내용 작성 */}</div>;
};

export default TestuseLogin;
