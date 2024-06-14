import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCheckedPassword from '../../Hooks/user/useCheckedPassword';

export default function CheckedPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const { checkPassword, loading, isValid } = useCheckedPassword();

  const handleProfileSetClick = async () => {
    await checkPassword(password);
  };

  useEffect(() => {
    if (isValid) {
      navigate('/mypage/profile');
    }
  }, [isValid, navigate]);

  return (
    <div className="m-40 w-[1200px] min-h-[300px] bg-white rounded-lg p-6 flex flex-col justify-center items-center">
      <div className="w-[400px]">
        <p className="flex justify-center text-3xl mb-8">비밀번호 재확인</p>
        <p className="flex justify-center mb-4">
          회원님의 정보를 안전하게 보호하기 위해 재확인합니다.
        </p>
        <div className="flex justify-between items-center">
          <div className="w-3/4 mr-2">
            <input
              id="password"
              type="password"
              className="w-full h-14 p-2 border border-gray-300 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-1/4 h-14 bg-prime text-white p-2 rounded-lg"
            onClick={handleProfileSetClick}
            disabled={loading} // Disable button while loading
          >
            {loading ? '확인 중...' : '확인'}
          </button>
        </div>
      </div>
    </div>
  );
}
