import { create } from 'zustand';

// Zustand 스토어 생성
const useAuthStore = create((set) => ({
  accessToken: localStorage.getItem('accessToken') || '', // 초기값 설정
  setAccessToken: (token) => set({ accessToken: token }), // accessToken을 설정하는 메서드
}));

export default useAuthStore;
