import React from 'react';

export default function InfoInput({ title, type, className }) {
  return (
    <>
      <p className="text-subTitle">{title}</p>
      <input
        type={type}
        className={`w-full h-14 mb-4 p-2 border border-gray-300 rounded-lg ${className}`}
      />
    </>
  );
}
