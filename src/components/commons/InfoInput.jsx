import React, { useEffect } from 'react';

export default function InfoInput({ title, type, className, value, onChange }) {
  return (
    <>
      <p className="text-subTitle">{title}</p>
      <input
        type={type}
        className={`w-full h-14 p-2 border border-gray-300 rounded-lg ${className}`}
        value={value} // 입력값 바인딩
        onChange={onChange} // onChange 이벤트 핸들러 추가
      />
    </>
  );
}
