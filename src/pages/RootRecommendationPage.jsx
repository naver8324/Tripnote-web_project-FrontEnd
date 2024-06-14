import React, { useEffect } from 'react';
import Tabs from '../components/Tabs/Tabs';
import RootSpot from '../components/root/RootSpot';
import RootArea from '../components/root/RootArea';
import BarRootSpot from '../components/root/BarRootSpot';
import BarRootArea from '../components/root/BarRootArea';
import useTabStore from '../store/useTabStore';
import NaverSpotMap from '../components/Map/NaverSpotMap';
import useMapSpotStore from '../store/useMapSpotStore';
import NaverRegionMap from '../components/Map/NaverRegionMap';
import useMapRegionStore from '../store/useMapRegionStore';

export default function RootRecommendationPage() {
  const { activeIndex, setActiveIndex } = useTabStore();
  const markers = useMapSpotStore((state) => state.markers);
  const polylineColors = useMapSpotStore((state) => state.polylineColors);
  const routes = useMapSpotStore((state) => state.routes);
  const selectedRouteIndex = useMapSpotStore(
    (state) => state.selectedRouteIndex,
  );
  const center = useMapSpotStore((state) => state.center);
  const [selectedRegion, setSelectedRegion] = React.useState('seoul');

  const regionMarkers = useMapRegionStore((state) => state.markers);
  const regionPolylineColors = useMapRegionStore(
    (state) => state.polylineColors,
  );
  const regionRoutes = useMapRegionStore((state) => state.routes);
  const regionSelectedRouteIndex = useMapRegionStore(
    (state) => state.selectedRouteIndex,
  );
  const regionCenter = useMapRegionStore((state) => state.center);
  const setRegionCenter = useMapRegionStore((state) => state.setCenter);

  const handleSelectRegion = (regionKey, regionCenter) => {
    setSelectedRegion(regionKey);
    setRegionCenter(regionCenter);
  };

  useEffect(() => {
    setActiveIndex(0); // 스팟 중심 추천 탭이 항상 먼저 보이도록 설정
  }, [setActiveIndex]);

  return (
    <div className="mt-[118px] w-full bg-subTitle flex mx-auto">
      <div className="w-[370px] bg-white border-e-2">
        <div className="w-[370px] p-4 flex justify-between items-center">
          <Tabs>
            <Tabs.Tab index={0}>스팟 중심 추천</Tabs.Tab>
            <Tabs.Tab index={1}>지역 추천 Best 5</Tabs.Tab>

            <Tabs.TabContent index={1}>
              <RootArea onSelectRegion={handleSelectRegion} />
            </Tabs.TabContent>
            <Tabs.TabContent index={0}>
              <RootSpot />
            </Tabs.TabContent>
          </Tabs>
        </div>
      </div>
      <div className="w-[360px] bg-white">
        {activeIndex === 0 ? (
          <BarRootSpot />
        ) : (
          <BarRootArea selectedRegion={selectedRegion} />
        )}
      </div>

      {activeIndex === 0 ? (
        <NaverSpotMap
          markers={markers}
          className={'w-screen'}
          polylineColors={polylineColors}
          routes={routes}
          selectedRouteIndex={selectedRouteIndex}
          center={center}
        />
      ) : (
        <NaverRegionMap
          markers={regionMarkers}
          className={'w-screen'}
          polylineColors={regionPolylineColors}
          routes={regionRoutes}
          selectedRouteIndex={regionSelectedRouteIndex}
          center={regionCenter}
        />
      )}
    </div>
  );
}
