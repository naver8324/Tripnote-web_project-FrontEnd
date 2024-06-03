import React, { useEffect } from 'react';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  useEffect(() => {
    // 에러 메시지를 알럿 창으로 표시
    alert(`요청사항을 처리하는데 실패했습니다. ${error.message}`);
    resetErrorBoundary(); // 에러 상태를 리셋
  }, [error, resetErrorBoundary]);

  return null; // 알럿 창을 띄우기 때문에 별도의 UI를 렌더링하지 않음
};

export default ErrorFallback;
