import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const SpotDndCard = ({ spot, index, moveSpot }) => {
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
      className="w-[330px] h-[110px] mt-4 flex cursor-pointer rounded-xl"
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

export default SpotDndCard;
