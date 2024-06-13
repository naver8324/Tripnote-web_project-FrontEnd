import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // 루트 요소 설정

const CustomConfirmModal = ({
  isOpen,
  onRequestClose,
  onConfirm,
  onCancel,
  message, // 추가된 prop
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmation Modal"
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-11/12 max-w-md">
        <h2 className="text-xl mb-4">{message}</h2>
        <div className="flex justify-around mt-4">
          <button
            onClick={onConfirm}
            className="bg-green-500 w-[80px] text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            예
          </button>
          <button
            onClick={onCancel}
            className="bg-red-500 w-[80px] text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            아니오
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CustomConfirmModal;
