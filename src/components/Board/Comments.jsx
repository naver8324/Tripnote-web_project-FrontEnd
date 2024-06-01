import React, { useState } from 'react';

export default function Comments() {
  const [comment, setComment] = useState('');
  return (
    <div className="text-title">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="댓글을 남겨주세요."
        className="pl-5 pt-5 placeholder:opacity-80 resize-none outline-none w-full h-[60px] overflow-auto bg-gray-100 rounded-md"
      ></textarea>
      <button></button>
    </div>
  );
}
