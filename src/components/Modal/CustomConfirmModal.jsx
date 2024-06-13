import React from 'react';
import Modal from 'react-modal';
import Button from '../commons/Button';

Modal.setAppElement('#root'); // 루트 요소 설정

const CustomConfirmModal = ({
  isOpen,
  onRequestClose,
  onConfirm,
  onCancel,
  title,
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
    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button onClick={onRequestClose} className="text-gray-400 hover:text-gray-600 ml-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="my-4">
        {message.split('<br/>').map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <Button
          onClick={onCancel}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
        >
          아니오
        </Button>
        <Button
          onClick={onConfirm}
          className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500"
        >
          예
        </Button>
      </div>
    </div>
  </Modal>
  );
};

export default CustomConfirmModal;
