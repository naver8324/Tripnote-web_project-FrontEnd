import React, { useEffect, useMemo } from 'react';
import useCheckboxStore from '../../store/useCheckboxStore';
import { useNavigate } from 'react-router-dom';

export default function AgreePage() {
  const {
    ageChecked,
    privacyChecked,
    termsChecked,
    toggleAgeChecked,
    togglePrivacyChecked,
    toggleTermsChecked,
    toggleAllChecked,
    resetAllChecked, // 모든 체크박스를 초기화하는 새로운 메서드
  } = useCheckboxStore();
  const allChecked = useMemo(
    () => ageChecked && privacyChecked && termsChecked,
    [ageChecked, privacyChecked, termsChecked],
  );

  const navigate = useNavigate();

  const handleNext = () => {
    // 각각의 필수 항목이 체크되었는지 확인
    if (ageChecked && privacyChecked && termsChecked) {
      // 다음 페이지로 이동
      navigate('/signup');
    } else {
      // 필수 항목이 모두 체크되지 않았을 때 처리
      alert('필수 항목에 동의해주세요.');
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 전체 동의 체크 해제
    resetAllChecked();
  }, []); // 빈 배열은 이 효과가 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.

  return (
    <div className="m-20 flex flex-col justify-center items-center h-screen">
      <div className="w-1/2 p-8 border border-gray-300 rounded-lg ">
        <p className="text-3xl mb-8">트립 노트 회원 약관 동의</p>
        <div className="mb-4 border-b">
          <input
            type="checkbox"
            checked={allChecked}
            onChange={(e) => toggleAllChecked(e.target.checked)}
            className="h-5 w-5 mr-2 mb-8"
          />
          <label className="text-xl cursor-pointer" htmlFor="all">
            전체 동의하기
          </label>
        </div>
        <div className="mb-4  border-b">
          <input
            type="checkbox"
            checked={ageChecked}
            onChange={toggleAgeChecked}
            className="h-5 w-5 mr-2 mb-8"
          />
          <label className="text-xl " htmlFor="age ">
            [필수] 본인은 만 14세 이상입니다.
          </label>
        </div>
        <div className="mb-8 pb-8 border-b">
          <input
            type="checkbox"
            checked={privacyChecked}
            onChange={togglePrivacyChecked}
            className="h-5 w-5 mr-2 mb-4"
          />
          <label className="text-xl cursor-pointer" htmlFor="privacy">
            [필수] 개인정보 수집에 동의합니다.
          </label>
          <div style={{ maxHeight: '100px' }}>
            {/* 개인정보 수집 내용 */}
            <p>
              Breadit은 회원가입, 민원 등 고객상담 처리, 본인확인 등을 목적으로
              개인정보를 수집 및 이용합니다.
            </p>
          </div>
        </div>
        <div className="mb-8">
          <input
            type="checkbox"
            checked={termsChecked}
            onChange={toggleTermsChecked}
            className="h-5 w-5 mr-2 mb-4"
          />
          <label className="text-xl cursor-pointer" htmlFor="terms">
            [필수] 이용약관에 동의합니다.
          </label>
          <div style={{ maxHeight: '100px' }}>
            {/* 이용약관 내용 */}
            <p>
              [ Trip-note 이용 약관 ] 이 약관은 Trip-note 주식회사(이하
              “회사”)가 운영하는 사이버몰에서 제공하는 서비스와 이를 이용하는
              회원의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </div>
        </div>

        <button
          className="text-lg w-full h-14 bg-prime text-white p-2 rounded-lg mb-5"
          onClick={handleNext}
        >
          다음
        </button>
      </div>
    </div>
  );
}
