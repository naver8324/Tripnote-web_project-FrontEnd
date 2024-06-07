import React from 'react';

const SpotCard = ({ spot, onClick }) => {
  return (
    <div
      key={spot.id}
      className="w-[330px] h-[110px] mt-4 flex cursor-pointer rounded-xl"
      onClick={onClick}
    >
      <img
        src={spot.imageUrl}
        alt={spot.location}
        className="w-1/3 h-full object-cover rounded-xl"
      />
      <div className="w-2/3 h-full p-2">
        <h2 className="text-lg font-bold">{spot.location}</h2>
        <p className="text-sm">{spot.region}</p>
        <p className="text-sm">{spot.address}</p>
      </div>
    </div>
  );
};

export default SpotCard;
