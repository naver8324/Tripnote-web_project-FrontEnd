import { create } from 'zustand';

const useMapCreateStore = create((set) => ({
  markers: [],
  routes: [],
  routeSpots: [],
  savedRoutes: [], // 추가된 경로 저장
  center: { latitude: 37.5665, longitude: 126.978 },
  localRegionTags: [], // 지역 해시태그
  localThemeTags: [], // 테마 해시태그
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
  setLocalRegionTags: (tags) => set({ localRegionTags: tags }), // 지역 해시태그 설정
  setLocalThemeTags: (tags) => set({ localThemeTags: tags }), // 테마 해시태그 설정
}));

export default useMapCreateStore;
