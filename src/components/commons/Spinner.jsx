import React from 'react';
import { BeatLoader } from 'react-spinners'

export default function Spinner() {
  return (
    <div className='flex justify-center'>
      <BeatLoader color='#1DC078' className='mt-16'/>
    </div>
  );
}

