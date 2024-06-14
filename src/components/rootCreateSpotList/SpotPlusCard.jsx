import React from 'react';
import noimage from '../../assets/noimage.png';

const SpotPlusCard = ({ spot, onAddClick, onRemoveClick, isAdded }) => {
  return (
    <div
      key={spot.id}
      className="w-[330px] h-[130px] mt-4 flex cursor-pointer rounded-xl shadow-md"
    >
      <img
        src={spot.imageUrl}
        onError={(e) => {
          e.target.onerror = null; // 무한 루프 방지
          e.target.src = noimage;
        }}
        alt={noimage}
        className="w-1/3 h-full object-cover rounded-l-xl"
      />
      <div className="w-2/3 h-full p-2">
        <h2 className="text-lg font-bold">{spot.location}</h2>
        <p className="text-sm">{spot.region}</p>
        <p className="text-sm">{spot.address}</p>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          isAdded ? onRemoveClick() : onAddClick();
        }}
        className={`w-1/6 flex items-center justify-center text-xl font-bold text-white ${
          isAdded
            ? 'bg-red-400 hover:bg-red-300'
            : 'bg-blue-400 hover:bg-blue-300'
        } rounded-r-xl`}
      >
        {isAdded ? '-' : '+'}
      </button>
    </div>
  );
};

export default SpotPlusCard;
