import { create } from 'zustand';

const useMapSpotStore = create((set) => ({
  markers: [],
  routes: [],
  routeSpots: [],
  selectedRouteIndex: null,
  center: { latitude: 37.5665, longitude: 126.978 },
  setMarkers: (newMarkers) => set({ markers: newMarkers }),
  setRoutes: (newRoutes) => set({ routes: newRoutes }),
  setRouteSpots: (newSpots) => set({ routeSpots: newSpots }),
  setSelectedRouteIndex: (index) => set({ selectedRouteIndex: index }),
  setCenter: (newCenter) => set({ center: newCenter }),
}));

export default useMapSpotStore;
