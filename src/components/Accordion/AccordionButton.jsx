import React from 'react';
import useAccordionStore from '../../store/useAccordionStore';

export default function AccordionButton() {
  const { isAccordionOpen, toggleAccordion } = useAccordionStore();

  return (
    <button
      onClick={toggleAccordion}
      className="bg-gray-700 text-white px-4 py-2 border-none cursor-pointer transition-colors duration-300 hover:bg-gray-800"
    >
      {isAccordionOpen ? '닫기' : '열기'}
    </button>
  );
}
