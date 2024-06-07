import { create } from 'zustand';

const useMapStore = create((set) => ({
  markers: [],
  routes: [],
  routeSpots: [],
  center: { latitude: 37.5665, longitude: 126.978 },
  setMarkers: (newMarkers) => set({ markers: newMarkers }),
  setRoutes: (newRoutes) => set({ routes: newRoutes }),
  setRouteSpots: (newSpots) => set({ routeSpots: newSpots }),
  addSpotToRoute: (spot) =>
    set((state) => ({ routeSpots: [...state.routeSpots, spot] })),
  removeSpotFromRoute: (spotId) =>
    set((state) => ({
      routeSpots: state.routeSpots.filter((spot) => spot.id !== spotId),
    })),
  setCenter: (newCenter) => set({ center: newCenter }),
}));

export default useMapStore;
