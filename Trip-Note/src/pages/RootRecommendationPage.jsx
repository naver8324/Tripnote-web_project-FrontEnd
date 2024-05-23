import React from 'react';
import Tabs from '../components/Tabs/Tabs';
import RootSpot from '../components/root/RootSpot';
import RootArea from '../components/root/RootArea';

export default function RootRecommendationPage() {
  return (
    <div className="m-40 ">
      <Tabs tabCount={2} tabLabels={['스팟중심추천', '지역추천Best5']}>
        <RootSpot />
        <RootArea />
      </Tabs>
    </div>
  );
}
