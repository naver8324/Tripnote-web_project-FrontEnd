import create from 'zustand';

const useAuthStore = create((set) => ({
  isAuth: false,
  setIsAuth: (isAuth) => set({ isAuth }),
  logout: () => {
    localStorage.removeItem('accessToken');
    set({ isAuth: false });
  },
}));

export default useAuthStore;
