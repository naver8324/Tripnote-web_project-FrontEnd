import React from 'react';
import Tabs from '../../components/Tabs/Tabs';
import RootSpot from '../../components/root/RootSpot';
import RootArea from '../../components/root/RootArea';

const RootRecommendationPage = () => {
  return (
    <Tabs tabCount={2} tabLabels={['스팟중심추천', '지역추천Best5']}>
      <RootSpot />
      <RootArea />
    </Tabs>
  );
};
export default RootRecommendationPage;
