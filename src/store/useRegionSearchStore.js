import create from 'zustand';

const useRegionSearchStore = create((set) => ({
  selectedRegion: 'SEOUL',
  setSelectedRegion: (region) => set({ selectedRegion: region }),
  redirectPath: '/root/recommend', // 추가
  setRedirectPath: (path) => set({ redirectPath: path }), // 추가
}));

export default useRegionSearchStore;
