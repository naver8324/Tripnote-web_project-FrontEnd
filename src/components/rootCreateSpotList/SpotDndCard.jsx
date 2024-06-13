import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import noimage from '../../assets/noimage.png';

const SpotDndCard = ({ spot, index, moveSpot, removeSpot }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'spot',
    hover(item) {
      if (item.index !== index) {
        moveSpot(item.index, index);
        item.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'spot',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="spot-card w-[330px] h-[130px] mt-4 flex cursor-pointer rounded-xl shadow-md animate-fade-in relative border-2 border-transparent"
    >
      {isDragging && (
        <div className="absolute inset-0 bg-yellow-100 opacity-50 rounded-xl border-2 border-yellow-500"></div>
      )}
      <img
        src={spot.imageUrl}
        onError={(e) => {
          e.target.onerror = null; // 무한 루프 방지
          e.target.src = noimage;
        }}
        alt={noimage}
        className="w-1/3 h-full object-cover rounded-l-xl"
      />
      <div className="w-2/1 h-full p-2">
        <h2 className="text-lg font-bold">{spot.location}</h2>
        <p className="text-sm">{spot.region}</p>
        <p className="text-sm">{spot.address}</p>
      </div>
      <div className="w-1/6 h-full"></div>
      <button
        onClick={() => removeSpot(index)}
        className="absolute  bg-red-400 text-white rounded-full w-6 h-6 flex items-center justify-center"
      >
        <p className="text-lg">ㅡ</p>
      </button>
    </div>
  );
};

export default SpotDndCard;
