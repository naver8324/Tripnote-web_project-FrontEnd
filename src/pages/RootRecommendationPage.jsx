import React, { useState } from 'react';
import NaverMap from '../components/Map/NaverMap';
import Tabs from '../components/Tabs/Tabs';
import RootSpot from '../components/root/RootSpot';
import RootArea from '../components/root/RootArea';
import BarRootSpot from '../components/root/BarRootSpot';
import BarRootArea from '../components/root/BarRootArea';
import useTabStore from '../store/useTabStore';
import PhotoMap from '../components/Map/PhotoMap';

export default function RootRecommendationPage() {
  const { activeIndex } = useTabStore();

  return (
    <div className="mt-[118px] w-full bg-subTitle flex mx-auto">
      <div className="w-[360px] bg-white border-e-2">
        <div className="p-4 flex justify-between items-center ">
          <Tabs>
            <Tabs.Tab index={0}>스팟 중심 추천</Tabs.Tab>
            <Tabs.Tab index={1}>지역 추천 Best 5</Tabs.Tab>
            <Tabs.TabContent index={0}>
              <RootSpot />
            </Tabs.TabContent>
            <Tabs.TabContent index={1}>
              <RootArea />
            </Tabs.TabContent>
          </Tabs>
        </div>
      </div>
      <div className="w-[360px] bg-white">
        {activeIndex === 0 ? <BarRootSpot /> : <BarRootArea />}
      </div>

      <PhotoMap />
    </div>
  );
}
