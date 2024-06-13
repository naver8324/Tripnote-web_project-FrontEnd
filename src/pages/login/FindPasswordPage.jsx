import React, { useState } from 'react';
import FindPassword from "../../components/Email/FindPassword.jsx";

const FindPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  return (
    <div className="m-40 w-[1200px] min-h-[300px] bg-white rounded-lg p-6 flex flex-col justify-center items-center">
      <div className="w-[400px]">
        <p className="flex justify-center text-3xl mb-8">비밀번호 찾기</p>
        <p className="flex justify-center mb-4">
          이메일 인증을 하시면 임시 비밀번호를 보내드립니다.
        </p>
        <FindPassword
          email={email}
          setEmail={setEmail}
          setIsVerified={setIsVerified}
        />
      </div>
    </div>
  );
};

export default FindPasswordPage;
