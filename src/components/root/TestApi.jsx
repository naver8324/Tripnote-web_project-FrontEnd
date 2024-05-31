import React from 'react';
import useAxios from '../../utils/api';

export default function TestApi() {
  const { responseData, error, loading } = useAxios({
    method: 'get',
    url: '/api/member/check-email?email=test55@test.com', // 기본 URL을 제외한 경로만 지정
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3Q1NUB0ZXN0LmNvbSIsInJvbGUiOiJST0xFX01FTUJFUiIsImlhdCI6MTcxNzE1OTI4NCwiZXhwIjoxNzE3MTk1Mjg0fQ.BQe65RA_LEr6J-V-ORni9sVlC3qRff0rkmEhSiPoOew',
    },
    shouldFetch: true,
  });
  return (
    <div>
      {loading && <p>로딩 중...</p>}
      {error && <p>오류: {error}</p>}
      {responseData && <p>데이터: {JSON.stringify(responseData)}</p>}
    </div>
  );
}
