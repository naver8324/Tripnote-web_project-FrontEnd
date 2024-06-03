import { create } from 'zustand';

// Zustand 스토어 생성
const useAuthStore = create((set) => ({
  isLoggedIn: !!localStorage.getItem('accessToken'),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
}));

export default useAuthStore;
