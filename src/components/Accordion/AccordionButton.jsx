import React from 'react';

export default function AccordionButton({ isAccordionOpen, toggleAccordion }) {
  return (
    <button
      onClick={toggleAccordion}
      className="bg-gray-400 text-white px-4 py-2 border-none cursor-pointer transition-colors duration-300 hover:bg-gray-300"
    >
      {isAccordionOpen ? '닫기' : '열기'}
    </button>
  );
}
