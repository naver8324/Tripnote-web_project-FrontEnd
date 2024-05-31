import React, { useEffect } from 'react';
import axios from 'axios';

const TestComponent = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3Q1NUB0ZXN0LmNvbSIsInJvbGUiOiJST0xFX01FTUJFUiIsImlhdCI6MTcxNzE1OTI4NCwiZXhwIjoxNzE3MTk1Mjg0fQ.BQe65RA_LEr6J-V-ORni9sVlC3qRff0rkmEhSiPoOew';

        const response = await axios.get(
          'http://34.64.39.102:8080/api/member/test55@test.com',
          {
            headers: {
              Authorization: token,
            },
          },
        );
        console.log(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return <div>{/* 컴포넌트 내용 작성 */}</div>;
};

export default TestComponent;
