import { create } from 'zustand';

const useMapRegionStore = create((set) => ({
  markers: [],
  routes: [],
  routeSpots: [],
  center: { latitude: 37.5665, longitude: 126.978 },
  setMarkers: (newMarkers) => set({ markers: newMarkers }),
  setRoutes: (newRoutes) => set({ routes: newRoutes }),
  setRouteSpots: (newSpots) => set({ routeSpots: newSpots }),
  setCenter: (newCenter) => set({ center: newCenter }),
}));

export default useMapRegionStore;
