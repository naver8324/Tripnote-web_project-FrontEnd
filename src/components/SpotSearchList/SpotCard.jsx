import React from 'react';
import useMapSpotStore from '../../store/useMapSpotStore';
import noimage from '../../assets/noimage.png';

const SpotCard = ({ spot, onClick, isSelected, showAddButton = false }) => {
  const addSpot = useMapSpotStore((state) => state.addSpotToRoute);

  const handleAddClick = (e) => {
    e.stopPropagation();
    addSpot(spot);
  };

  return (
    <div
      className={`w-[330px] h-[110px] mt-4 flex cursor-pointer rounded-xl ${isSelected ? 'bg-[#f1f3f5]' : 'bg-white'}`}
      onClick={onClick}
    >
      <img
        src={spot.imageUrl}
        onError={(e) => {
          e.target.onerror = null; // 무한 루프 방지
          e.target.src = noimage;
        }}
        alt={noimage}
        className="w-1/3 h-full object-cover rounded-xl"
      />
      <div className="w-2/3 h-full p-2">
        <h2 className="text-lg font-bold">{spot.location}</h2>
        <p className="text-sm">{spot.region}</p>
        <p className="text-sm">{spot.address}</p>
        {showAddButton && (
          <button onClick={handleAddClick} className="mt-2 text-blue-500">
            Add
          </button>
        )}
      </div>
    </div>
  );
};

export default SpotCard;
