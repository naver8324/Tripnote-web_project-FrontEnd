import { create } from 'zustand';

const useMapSpotStore = create((set) => ({
  markers: [],
  routes: [],
  selectedRouteIndex: null,
  center: { latitude: 37.5665, longitude: 126.978 },
  polylineColors: ['#F87171', '#6EE7B7', '#93C5FD'],
  openItems: [],
  setMarkers: (newMarkers) => set({ markers: newMarkers }),
  setRoutes: (newRoutes) => set({ routes: newRoutes }),
  setSelectedRouteIndex: (index) => set({ selectedRouteIndex: index }),
  setCenter: (newCenter) => set({ center: newCenter }),
  setPolylineColors: (newColors) => set({ polylineColors: newColors }),
  setOpenItems: (newOpenItems) => set({ openItems: newOpenItems }),
  setRegion2: (region) => set({ region, routes: [], markers: [] }),
  setClickedSpotName: (clickedSpotName) => set({ clickedSpotName }),
}));

export default useMapSpotStore;
