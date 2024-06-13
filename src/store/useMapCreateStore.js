import { create } from 'zustand';

const regionCenters = {
  SEOUL: { latitude: 37.5665, longitude: 126.978 },
  INCHEON: { latitude: 37.4563, longitude: 126.7052 },
  BUSAN: { latitude: 35.1796, longitude: 129.0756 },
  DAEGU: { latitude: 35.8722, longitude: 128.6025 },
  ULSAN: { latitude: 35.5384, longitude: 129.3114 },
  GWANGJU: { latitude: 35.1595, longitude: 126.8526 },
  DAEJEON: { latitude: 36.3504, longitude: 127.3845 },
  SEJONG: { latitude: 36.4876, longitude: 127.2825 },
  GYEONGGI: { latitude: 37.4138, longitude: 127.5183 },
  GANGWON: { latitude: 37.8228, longitude: 128.1555 },
  CHUNGBUK: { latitude: 36.6356, longitude: 127.4914 },
  CHUNGNAM: { latitude: 36.5184, longitude: 126.8 },
  GYEONGBUK: { latitude: 36.576, longitude: 128.5056 },
  GYEONGNAM: { latitude: 35.4606, longitude: 128.2132 },
  JEONBUK: { latitude: 35.7175, longitude: 127.153 },
  JEONNAM: { latitude: 34.816, longitude: 126.4629 },
  JEJU: { latitude: 33.4996, longitude: 126.5312 },
};

const useMapCreateStore = create((set) => ({
  markers: [],
  routes: [],
  routeSpots: [],
  savedRoutes: [],
  center: { latitude: 37.5665, longitude: 126.978 },
  localRegionTags: [],
  localThemeTags: [],
  region: '',

  setMarkers: (newMarkers) => set({ markers: newMarkers }),
  setRoutes: (newRoutes) => set({ routes: newRoutes }),
  setRouteSpots: (newSpots) => set({ routeSpots: newSpots }),
  addSpotToRoute: (spot) =>
    set((state) => {
      const newSpots = [...state.routeSpots, spot];
      const newMarkers = newSpots.map((spot, index) => ({
        latitude: spot.lat,
        longitude: spot.lng,
        id: spot.id,
        index: index + 1,
      }));
      return { routeSpots: newSpots, markers: newMarkers };
    }),
  removeSpotFromRoute: (spotId) =>
    set((state) => {
      const newSpots = state.routeSpots.filter((spot) => spot.id !== spotId);
      const newMarkers = newSpots.map((spot, index) => ({
        latitude: spot.lat,
        longitude: spot.lng,
        id: spot.id,
        index: index + 1,
      }));
      return { routeSpots: newSpots, markers: newMarkers };
    }),
  setCenter: (newCenter) => set({ center: newCenter }),
  saveRoute: (route) =>
    set((state) => ({
      savedRoutes: [...state.savedRoutes, route],
    })),
  setLocalRegionTags: (tags) => set({ localRegionTags: tags }),
  setLocalThemeTags: (tags) => set({ localThemeTags: tags }),
  setRegion: (region) =>
    set((state) => {
      const newCenter = regionCenters[region] || state.center;
      return { region, routeSpots: [], markers: [], center: newCenter };
    }),
}));

export default useMapCreateStore;
