import { create } from 'zustand';

const useMapRegionStore = create((set) => ({
  markers: [],
  routes: [],
  routeSpots: [],
  center: { latitude: 37.5665, longitude: 126.978 },
  polylineColors: ['#F87171', '#FBBF24', '#6EE7B7', '#93C5FD', '#C084FC'],

  setMarkers: (newMarkers) => set({ markers: newMarkers }),
  setRoutes: (newRoutes) => set({ routes: newRoutes }),
  setRouteSpots: (newSpots) => set({ routeSpots: newSpots }),
  setCenter: (newCenter) => set({ center: newCenter }),
}));

export default useMapRegionStore;
