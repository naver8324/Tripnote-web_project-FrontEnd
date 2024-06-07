import { create } from 'zustand';

const useUserStore = create((set) => ({
  email: '',
  nickname: '',
  setEmail: (email) => set({ email }),
  setNickname: (nickname) => set({ nickname }),
  resetUser: () => set({ email: '', nickname: '' }),
}));

export default useUserStore;
