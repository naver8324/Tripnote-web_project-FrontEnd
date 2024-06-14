import axios, { isAxiosError, HttpStatusCode } from 'axios';
import useAuthStore from '../store/useAuthStore';
import errorHandler from './errorHandler';

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.timeout = 5000;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 요청 인터셉터: 모든 요청에 토큰을 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터: 토큰이 유효하지 않은 경우 로그아웃
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === HttpStatusCode.Unauthorized
      // || error.response.status === HttpStatusCode.InternalServerError
    ) {
      useAuthStore.getState().logout(); // Zustand store의 로그아웃 함수 호출
    }
    return errorHandler(error); // 기존 에러 핸들러 호출
  },
);

export default api;
