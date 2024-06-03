import React, { useState } from 'react';
import PostModal from '../Modal/PostModal';

export default function AccordionRootArea() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="p-4">
      <p className="text-lg font-medium">지역추천 아코디언 컴포넌트</p>
      <button
        onClick={openModal}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
      >
        게시물 상태보기
      </button>
      <PostModal isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  );
}
