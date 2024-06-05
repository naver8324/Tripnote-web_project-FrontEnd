import create from 'zustand';
import { routes as mockRoutes } from './routes';

const useMapStore = create((set) => ({
  markers: [],
  routes: [],
  setMarkers: (newMarkers) => set({ markers: newMarkers }),
  setRoutes: (newRoutes) => set({ routes: newRoutes }),
  setMockRoutes: () => set({ routes: mockRoutes }), // 목데이터 설정 함수 추가
}));

export default useMapStore;
