import React, { useState } from 'react';
import NaverMap from '../components/Map/NaverMap';
import RootCreate from '../components/root/RootCreate';
import BarRootCreate from '../components/root/BarRootCreate';

export default function RootCreatePage() {
  return (
    <div className="mt-[118px] w-full bg-subTitle flex mx-auto">
      <div className="w-[360px] bg-white">
        <div className="p-4 flex justify-between items-center">
          <RootCreate />
        </div>
      </div>
      <BarRootCreate />
    </div>
  );
}
