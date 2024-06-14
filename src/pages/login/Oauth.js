// import { useEffect, useState } from 'react';
// import useAxios from '../../Hooks/useAxios';
// import axios from 'axios';

// const useOauth = () => {
// const { responseData, error, loading, fetchData } = useAxios({
//   method: 'GET',
//   url: '/api/member/kakao',
//   shouldFetch: false,
//   showBoundary: true,
// });

// const kakaoLogin = async () => {
//   try {
//     await fetchData();
//     // 응답 데이터를 사용하여 추가 처리를 수행합니다.
//     // window.location.href = '/http://34.64.39.102:8080/oauth/kakao/callback';
//   } catch (err) {
//     console.error('Login failed:', err);
//   }
// };

// return { kakaoLogin, loading, error };
import axios from 'axios';

export async function kakaoLogin() {
  try {
    const response = await axios.get(
      'http://34.64.39.102:8080/api/member/kakao',
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        // CORS 설정은 서버에서 처리합니다. 클라이언트에서는 설정하지 않습니다.
      },
    );

    if (response.status === 302 || response.status === 301) {
      // 리다이렉트 URL로 수동으로 이동
      window.location.href = response.headers.location;
    } else {
    }
  } catch (error) {
    if (
      error.response &&
      (error.response.status === 302 || error.response.status === 301)
    ) {
      // 에러 응답이 리다이렉트인 경우 수동으로 이동
      window.location.href = error.response.headers.location;
    } else {
      console.error('Error fetching data:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      }
    }
  }
}
