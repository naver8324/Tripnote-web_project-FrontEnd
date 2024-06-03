import {create} from 'zustand';

const useTabStore = create((set) => ({
  activeIndex: 0,
  setActiveIndex: (index) => set({ activeIndex: index }),
}));

export default useTabStore;
