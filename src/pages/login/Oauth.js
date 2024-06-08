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
//     console.log('Login successful:', responseData);
//     // window.location.href = '/http://34.64.39.102:8080/oauth/kakao/callback';
//   } catch (err) {
//     console.error('Login failed:', err);
//   }
// };

// return { kakaoLogin, loading, error };
import axios from 'axios';
// import {useNavigate} from "react-router-dom";
// import useKakaoRedirect from "../../Hooks/user/useKakaoRedirect.js";
// import useAxios from "../../Hooks/useAxios.js";
//
// export async function kakaoLogin() {
//   const navigate = useNavigate();
//   const { kakaoRedirect } = useKakaoRedirect();
//
//   try {
//     const {response} = useAxios({
//       method: 'GET',
//       url: '/api/member/kakao',
//       shouldFetch: true,
//     });
//
//     const kakaoAuthUrl = response.data;
//     console.log("kakaoAuthUrl : ", response.data);
//
//     // 새 창에서 Kakao 인증 URL 열기
//     window.location.href = kakaoAuthUrl;
//
//     const code = new URL(window.location.href).searchParams.get("code");
//
//     try {
//       await kakaoRedirect(code);
//       navigate('/');
//     }catch (err){
//       console.error("kakao redirect failed: ", err);
//     }
//   }catch (err){
//       console.error("kakao login failed: ", err);
//   }
// }
