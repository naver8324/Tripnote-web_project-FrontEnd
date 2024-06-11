import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AgreePage() {
  const [ageChecked, setAgeChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);

  const redirectUrl =
    new URLSearchParams(location.search).get('redirecturl') || '/';

  const allChecked = useMemo(
    () => ageChecked && privacyChecked && termsChecked,
    [ageChecked, privacyChecked, termsChecked],
  );

  const navigate = useNavigate();

  const toggleAgeChecked = useCallback(
    () => setAgeChecked((prev) => !prev),
    [],
  );
  const togglePrivacyChecked = useCallback(
    () => setPrivacyChecked((prev) => !prev),
    [],
  );
  const toggleTermsChecked = useCallback(
    () => setTermsChecked((prev) => !prev),
    [],
  );
  const toggleAllChecked = useCallback((checked) => {
    setAgeChecked(checked);
    setPrivacyChecked(checked);
    setTermsChecked(checked);
  }, []);

  const handleNext = useCallback(() => {
    if (allChecked) {
      navigate(`/signup?redirecturl=${redirectUrl}`);
    } else {
      alert('필수 항목에 동의해주세요.');
    }
  }, [allChecked, navigate]);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 전체 동의 체크 해제
    setAgeChecked(false);
    setPrivacyChecked(false);
    setTermsChecked(false);
  }, []);

  return (
    <div className="m-20 flex flex-col justify-center items-center h-screen">
      <div className="w-1/2 p-8 border border-gray-300 rounded-lg ">
        <p className="text-3xl mb-8">트립 노트 회원 약관 동의</p>
        <div className="mb-4 border-b">
          <input
            type="checkbox"
            checked={allChecked}
            onChange={(e) => toggleAllChecked(e.target.checked)}
            className="h-5 w-5 mr-2 mb-7 "
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
            className="h-5 w-5 mr-2 mb-7"
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
