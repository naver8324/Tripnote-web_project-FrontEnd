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
    <div className="mt-[118px] w-full bg-subTitle flex mx-auto">
      <div className="w-1/5 bg-white">
        <div className="p-4 flex justify-between items-center">
          <RootCreate />
        </div>
        <AccordionButton />
      </div>

      {isAccordionOpen && (
        <Accordion isOpen={isAccordionOpen}>
          <AccordionRootCreate />
        </Accordion>
      )}
      <NaverMap className={isAccordionOpen ? 'w-3/5' : 'w-4/5'} />
    </div>
  );
}
