import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import InfoInput from '../commons/InfoInput';

Modal.setAppElement('#root'); // 모달을 사용할 애플리케이션 루트 요소를 설정

const HashtagModal = ({
  isOpen,
  onRequestClose,
  hashtagData,
  setHashtagData,
  setIsCreatingHashtag,
  handleUpdateHashtag,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="해시태그 생성/수정"
      className="modal-content min-w-[500px]"
      overlayClassName="modal-overlay"
    >
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          해시태그 생성/변경할 이름을 입력해주세요.
        </h2>
        <div className="flex items-center justify-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (hashtagData.id !== null) {
                handleUpdateHashtag();
              } else {
                setIsCreatingHashtag(true);
              }
              onRequestClose();
            }}
          >
            {''}
            <InfoInput
              title="해시태그 이름"
              type="text"
              value={hashtagData.name}
              onChange={(e) => {
                setHashtagData((prev) => ({ ...prev, name: e.target.value }));
              }}
            />
            <label htmlFor="selectOption">옵션 선택:</label>
            <select
              id="selectOption"
              value={hashtagData.city}
              onChange={(e) =>
                setHashtagData((prev) => ({ ...prev, city: e.target.value }))
              }
            >
              <option value={true}>지역</option>
              <option value={false}>지역 외</option>
            </select>
            <div className="flex justify-between">
              <button
                onClick={onRequestClose}
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                닫기
              </button>
              <button
                  type="submit"
                  className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                저장
              </button>
             </div>
            </form>
          </div>
      </div>
    </Modal>
  );
};

export default HashtagModal;
