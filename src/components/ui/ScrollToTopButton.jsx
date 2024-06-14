import React from 'react';
import { GoArrowUp } from "react-icons/go";

export default function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <button onClick={scrollToTop} className='fixed bottom-8 right-5 w-12 h-12 border-none rounded-full bg-title text-white cursor-pointer text-2xl flex items-center justify-center z-50 hover:bg-gray-800'>
      <GoArrowUp className='text-2xl font-bold'/>
    </button>
  );
}

