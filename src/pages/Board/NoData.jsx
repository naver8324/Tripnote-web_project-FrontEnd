import React from 'react';

export default function NoData({ message }) {
  return (
    <div className='text-center w-full p-4 rounded-lg bg-gray-100 mt-4'>
      <p>{ message }</p>
    </div>
  );
}

