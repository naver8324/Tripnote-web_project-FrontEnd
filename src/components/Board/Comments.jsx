import React, { useState } from 'react';
import Button from '../commons/Button';
import { ToastAlert } from '../commons/ToastAlert';

export default function Comments({ postDetail }) {
  const [comment, setComment] = useState('');
  const handleComment = () => {
    if(!comment.length) {
      ToastAlert('내용을 입력해주세요.', 'error')
    }

  }

  return (
    <div className="text-title relative pr-[80px]">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="댓글을 남겨주세요."
        className="pl-5 pt-5 placeholder:opacity-80 resize-none outline-none w-full h-[60px] overflow-auto bg-gray-100 rounded-md pr-[80px]"
      ></textarea>
      <Button
        onClick={handleComment}
        size="medium"
        className="bg-red-400 text-white absolute right-1 top-1/2 transform -translate-y-1/2 px-4"
      >
        등록
      </Button>
    </div>
  );
}
