import { create } from 'zustand';

const useMapSpotStore = create((set) => ({
  markers: [],
  routes: [],
  selectedRouteIndex: null,
  center: { latitude: 37.5665, longitude: 126.978 },
  polylineColors: ['#6EE7B7', '#93C5FD', '#c084fc', '#FBBF24', '#F87171'],
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
