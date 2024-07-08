import React from 'react';
import RootCreate from '../components/root/RootCreate';
import BarRootCreate from '../components/root/BarRootCreate';
import useMapCreateStore from '../store/useMapCreateStore';
import NaverCreateMap from '../components/Map/NaverCreateMap';

export default function RootCreatePage() {
  const markers = useMapCreateStore((state) => state.markers);

  return (
    <div className="mt-[118px] w-full bg-subTitle flex mx-auto">
      <div className="w-[370px] h-[calc(100vh-118px)] bg-white border-r-2 overflow-y-auto">
        <div className="w-full flex flex-col justify-between items-center">
          <RootCreate />
        </div>
      </div>
      <div className="w-[380px] h-[calc(100vh-118px)] bg-white border-r-2 overflow-y-auto">
        <BarRootCreate />
      </div>
      <div className="flex-grow">
        <NaverCreateMap markers={markers} className={'w-full'} />
      </div>
    </div>
  );
}
