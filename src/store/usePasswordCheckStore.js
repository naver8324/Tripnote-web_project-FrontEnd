import create from 'zustand';

const usePasswordCheckStore = create((set) => ({
  isPasswordChecked: false,
  setPasswordChecked: (value) => set({ isPasswordChecked: value }),
}));

export default usePasswordCheckStore;
