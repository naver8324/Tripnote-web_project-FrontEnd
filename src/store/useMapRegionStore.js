import { create } from 'zustand';

const useMapRegionStore = create((set) => ({
  markers: [],
  routes: [],
  routeSpots: [],
  center: { latitude: 37.5665, longitude: 126.978 },
  polylineColors: ['#6EE7B7', '#93C5FD', '#c084fc', '#FBBF24', '#F87171'],
  selectedRouteIndex: null,
  setMarkers: (newMarkers) => set({ markers: newMarkers }),
  setRoutes: (newRoutes) => set({ routes: newRoutes }),
  setRouteSpots: (newSpots) => set({ routeSpots: newSpots }),
  setCenter: (newCenter) => set({ center: newCenter }),
  setPolylineColors: (newColors) => set({ polylineColors: newColors }),
  setSelectedRouteIndex: (index) => set({ selectedRouteIndex: index }),
}));

export default useMapRegionStore;
