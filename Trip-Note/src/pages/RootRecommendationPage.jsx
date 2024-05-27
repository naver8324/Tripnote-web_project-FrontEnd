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
  const { activeIndex } = useTabStore();
  console.log('activeIndex:', activeIndex); // 현재 activeIndex 값 확인
  return (
    <div className="mt-[118px] w-[1920px] max-w-[1920px] bg-subTitle flex mx-auto">
      <div className="w-[400px] bg-white">
        <div className="p-4 flex justify-between items-center">
          <Tabs>
            <Tabs.Tab index={0}>스팟중심추천</Tabs.Tab>
            <Tabs.Tab index={1}>지역추천Best5</Tabs.Tab>
            {/* <Accordion/> // 컴포넌트가 들어와지는 실험용 */}
            <Tabs.TabContent index={0}>
              <RootSpot />
            </Tabs.TabContent>
            <Tabs.TabContent index={1}>
              <RootArea />
            </Tabs.TabContent>
          </Tabs>
        </div>
        <AccordionButton />
      </div>

      {isAccordionOpen && (
        <Accordion>
          {activeIndex === 0 ? <AccordionRootSpot /> : <AccordionRootArea />}
        </Accordion>
      )}
      <NaverMap className={isAccordionOpen ? 'w-[1120px]' : 'w-[1520px]'} />
    </div>
  );
}
