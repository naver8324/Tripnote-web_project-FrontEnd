import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0  bg-gray-600 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white w-[600px] p-8 rounded-lg shadow-lg ">
        <div>{children}</div>
      </div>
    </div>,
    document.getElementById('modal-root'),
  );
};

export default Modal;
