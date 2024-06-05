import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import InfoInput from '../commons/InfoInput';

Modal.setAppElement('#root'); // 모달을 사용할 애플리케이션 루트 요소를 설정

const HashtagModal = ({
  isOpen,
  onRequestClose,
  submitInput,
  hashtagName,
  hashtagCity,
}) => {
  const [newHashtagName, setNewHashtagName] = useState('');
  const [newHashtagCity, setNewHashtagCity] = useState(null);

  useEffect(() => {
    setNewHashtagName(hashtagName);
    setNewHashtagCity(hashtagCity);
  }, [hashtagName, hashtagCity]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="해시태그 생성/수정"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 w-[320px] h-[100px]">
          해시태그 생성/변경할 이름을 입력해주세요.
        </h2>
        <div className="flex items-center justify-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitInput(newHashtagName, newHashtagCity);
              onRequestClose();
            }}
          >
            {''}
            <InfoInput
              title="해시태그 이름"
              type="text"
              value={newHashtagName}
              onChange={(e) => {
                setNewHashtagName(e.target.value);
              }}
            />
            <label htmlFor="selectOption">옵션 선택:</label>
            <select
              id="selectOption"
              value={newHashtagCity}
              onChange={(e) => setNewHashtagCity(e.target.value)}
            >
              <option value={true}>지역</option>
              <option value={false}>지역 외</option>
            </select>
          </form>
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
};

export default HashtagModal;
