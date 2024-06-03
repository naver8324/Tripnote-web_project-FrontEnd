import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // 모달을 사용할 애플리케이션 루트 요소를 설정

const PostModal = ({ isOpen, onRequestClose }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="게시물 상태보기"
    className="modal-content"
    overlayClassName="modal-overlay"
  >
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 w-[720px] h-[400px]">
        게시물 상태보기
      </h2>
      <div className="flex items-center justify-center">
        <p>게시물 상태에 대한 내용</p>
      </div>
      <button
        onClick={onRequestClose}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
      >
        닫기
      </button>
    </div>
  </Modal>
);

export default PostModal;
