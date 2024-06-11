import React from 'react';
import NaverMap from '../Map/NaverMap';

const LoverRoot = () => {
  const routeId = 5;

  return (
    <div>
      <NaverMap routeId={routeId} />
    </div>
  );
};

export default LoverRoot;
