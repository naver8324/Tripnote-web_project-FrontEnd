import create from 'zustand';

const useRegionSearchStore = create((set) => ({
  selectedRegion: 'SEOUL',
  setSelectedRegion: (region) => set({ selectedRegion: region }),
  redirectPath: '/root/recommend',
  setRedirectPath: (path) => set({ redirectPath: path }),
}));

export default useRegionSearchStore;
