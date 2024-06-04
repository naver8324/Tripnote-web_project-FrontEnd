import React, { useEffect } from 'react';

const FallbackError = ({ error, resetErrorBoundary }) => {
  // useEffect(() => {
  //   // 에러 메시지를 알럿 창으로 표시
  //   alert(`요청사항을 처리하는데 실패했습니다. ${error.message}`);
  //   resetErrorBoundary(); // 에러 상태를 리셋
  // }, [error, resetErrorBoundary]);

  return (
    <>
      <div>{`error : ${JSON.stringify(error)}`}</div>
      <button onClick={() => resetErrorBoundary()}>클릭</button>
    </>
  );
};

export default FallbackError;
