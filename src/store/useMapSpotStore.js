import { create } from 'zustand';

const useMapSpotStore = create((set) => ({
  markers: [],
  routes: [],
  routeSpots: [],
  selectedRouteIndex: null,
  center: { latitude: 37.5665, longitude: 126.978 },
  polylineColors: [
    'rgba(255, 0, 0, 0.7)', // 연빨간색
    'rgba(135, 206, 250, 0.7)', // 하늘색
    'rgba(147, 112, 219, 0.7)', // 연보라색
  ],
  setMarkers: (newMarkers) => set({ markers: newMarkers }),
  setRoutes: (newRoutes) => set({ routes: newRoutes }),
  setRouteSpots: (newSpots) => set({ routeSpots: newSpots }),
  setSelectedRouteIndex: (index) => set({ selectedRouteIndex: index }),
  setCenter: (newCenter) => set({ center: newCenter }),
  setPolylineColors: (newColors) => set({ polylineColors: newColors }),
}));

export default useMapSpotStore;
