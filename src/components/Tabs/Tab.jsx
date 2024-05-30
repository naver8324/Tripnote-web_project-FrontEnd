import React from 'react';

const Tab = ({ label, onClick, isActive }) => {
  return (
    <button
      className={`text-lg font-medium py-3 px-4 text-gray-600 hover:text-gray-900 ${
        isActive ? 'border-b-2 border-prime' : ''
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Tab;
