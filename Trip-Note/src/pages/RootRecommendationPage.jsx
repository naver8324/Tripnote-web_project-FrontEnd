import React from 'react';
import Accordion from '../components/Accordion/Accordion';
import NaverMap from '../components/Map/NaverMap';
import useAccordionStore from '../store/useAccordionStore';
import Tabs from '../components/Tabs/Tabs';
import RootSpot from '../components/root/RootSpot';
import RootArea from '../components/root/RootArea';
import AccordionButton from '../components/Accordion/AccordionButton';
import AccordionRootSpot from '../components/root/AccordionRootSpot';
import useTabStore from '../store/useTabStore';
import AccordionRootArea from '../components/root/AccordionRootArea';

export default function RootRecommendationPage() {
  const { isAccordionOpen, toggleAccordion } = useAccordionStore();
  const { activeTab } = useTabStore();

  return (
    <div className="mt-[118px] w-[1920px] max-w-[1920px] bg-subTitle flex mx-auto">
      <div className="w-[400px] bg-white">
        <div className="p-4 flex justify-between items-center">
          <Tabs tabLabels={['스팟중심추천', '지역추천Best5']}>
            <RootSpot />
            <RootArea />
          </Tabs>
        </div>
        <AccordionButton />
      </div>

      {isAccordionOpen && (
        <Accordion>
          {activeTab === 0 ? <AccordionRootSpot /> : <AccordionRootArea />}
        </Accordion>
      )}
      <NaverMap className={isAccordionOpen ? 'w-[1120px]' : 'w-[1520px]'} />
    </div>
  );
}
