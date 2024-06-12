import create from 'zustand';

const useRegionSearchStore = create((set) => ({
  selectedRegion: 'SEOUL', // 초기값은 SEOUL
  setSelectedRegion: (region) => set({ selectedRegion: region }),
}));

export default useRegionSearchStore;
