import React from 'react';

export default function GhostButton({ className, title, onClick }) {
  return (
    <button
      className={`text-lg w-full h-14 bg-prime text-white p-2 rounded-lg mb-5 ${className}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
