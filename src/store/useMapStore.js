import { create } from 'zustand';

const useMapStore = create((set) => ({
  markers: [],
  routes: [],
  setMarkers: (newMarkers) => set({ markers: newMarkers }),
  setRoutes: (newRoutes) => set({ routes: newRoutes }),
}));

export default useMapStore;
