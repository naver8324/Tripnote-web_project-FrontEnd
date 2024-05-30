import React, { useState } from 'react';
import Accordion from '../components/Accordion/Accordion';
import NaverMap from '../components/Map/NaverMap';
import Tabs from '../components/Tabs/Tabs';
import RootSpot from '../components/root/RootSpot';
import RootArea from '../components/root/RootArea';
import AccordionButton from '../components/Accordion/AccordionButton';
import AccordionRootSpot from '../components/root/AccordionRootSpot';
import AccordionRootArea from '../components/root/AccordionRootArea';
import useTabStore from '../store/useTabStore';

export default function RootRecommendationPage() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const { activeIndex } = useTabStore();

  const toggleAccordion = () => {
    setIsAccordionOpen((prev) => !prev);
  };

  return (
    <div className="mt-[118px] w-full bg-subTitle flex mx-auto">
      <div className="w-1/5 bg-white">
        <div className="p-4 flex justify-between items-center">
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
        <AccordionButton
          isAccordionOpen={isAccordionOpen}
          toggleAccordion={toggleAccordion}
        />
      </div>

      {isAccordionOpen && (
        <Accordion isOpen={isAccordionOpen}>
          {activeIndex === 0 ? <AccordionRootSpot /> : <AccordionRootArea />}
        </Accordion>
      )}
      <NaverMap className={isAccordionOpen ? 'w-3/5' : 'w-4/5'} />
    </div>
  );
}
