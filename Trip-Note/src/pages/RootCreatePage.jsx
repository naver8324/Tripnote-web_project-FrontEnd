import React from 'react';
import Accordion from '../components/Accordion/Accordion';
import NaverMap from '../components/Map/NaverMap';
import useAccordionStore from '../store/useAccordionStore';
import AccordionButton from '../components/Accordion/AccordionButton';
import RootCreate from '../components/root/RootCreate';
import AccordionRootCreate from '../components/root/AccordionRootCreate';

export default function RootCreatePage() {
  const { isAccordionOpen } = useAccordionStore();

  return (
    <div className="mt-[118px] w-[1920px] max-w-[1920px] bg-subTitle flex mx-auto">
      <div className="w-[400px] bg-white">
        <div className="p-4 flex justify-between items-center">
          <RootCreate />
        </div>
        <AccordionButton />
      </div>

      {isAccordionOpen && (
        <Accordion>
          <AccordionRootCreate />
        </Accordion>
      )}
      <NaverMap className={isAccordionOpen ? 'w-[1120px]' : 'w-[1520px]'} />
    </div>
  );
}
