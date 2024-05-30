import React from 'react';
import { GoTriangleRight } from 'react-icons/go';

import useAccordionStore from '../../store/useAccordionStore';

export default function AccordionButton() {
  const { toggleAccordion } = useAccordionStore();

  return (
    <>
      <button className=" rounded-xl" onClick={toggleAccordion}>
        <p className="text-6xl text-subTitle">
          <GoTriangleRight />
        </p>
      </button>
    </>
  );
}
