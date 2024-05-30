import create from 'zustand';

const useTabStore = create((set) => ({
  activeTab: 0,
  setActiveTab: (index) => set({ activeTab: index }),
}));

export default useTabStore;
