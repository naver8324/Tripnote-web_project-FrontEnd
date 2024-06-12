import { create } from 'zustand';

const useMapSpotStore = create((set) => ({
  markers: [],
  routes: [],
  selectedRouteIndex: null,
  center: { latitude: 37.5665, longitude: 126.978 },
  polylineColors: ['#F87171', '#6EE7B7', '#93C5FD'],
  openItems: [], // 아코디언 열림 상태 추가

  setMarkers: (newMarkers) => {
    console.log('setMarkers:', newMarkers);
    set({ markers: newMarkers });
  },
  setRoutes: (newRoutes) => {
    console.log('setRoutes:', newRoutes);
    set({ routes: newRoutes });
  },
  setSelectedRouteIndex: (index) => {
    console.log('setSelectedRouteIndex:', index);
    set({ selectedRouteIndex: index });
  },
  setCenter: (newCenter) => {
    console.log('setCenter:', newCenter);
    set({ center: newCenter });
  },
  setPolylineColors: (newColors) => {
    console.log('setPolylineColors:', newColors);
    set({ polylineColors: newColors });
  },
  setOpenItems: (newOpenItems) => {
    console.log('setOpenItems:', newOpenItems);
    set({ openItems: newOpenItems });
  },
  setRegion2: (region) => set({ region, routes: [], markers: [] }),
  setClickedSpotName: (clickedSpotName) => {
    console.log('setClickedSpotName:', clickedSpotName);
    set({ clickedSpotName });
  },
}));

export default useMapSpotStore;
