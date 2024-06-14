import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuth: !!localStorage.getItem('accessToken'),
  setIsAuth: (isAuth) => set({ isAuth }),
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userNickname');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('provider');
    set({ isAuth: false });
  },
}));

export default useAuthStore;
