import React, { useState } from 'react';

export default function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 bg-gray-900 w-64 ${isOpen ? '' : '-translate-x-full'} transition duration-300 ease-in-out`}
    >
      <div className="p-4">
        <p>사이드바</p>
        {children}
      </div>
      <button
        className="fixed top-40 right-4 mt-40 mr-4 z-50 text-white"
        onClick={toggleSidebar}
      >
        {isOpen ? '닫기' : '열기'}
      </button>
    </div>
  );
}
