import { isAxiosError } from 'axios';

const errorHandler = (err) => {
  if (isAxiosError(err)) {
    if (err.response) {
      const { status } = err.response;
      switch (status) {
        case 400:
          err.message = '잘못된 요청입니다 (BadRequest)';
          break;
        case 401:
          err.message = '인증되지 않았습니다 (Unauthorized)';
          break;
        case 403:
          err.message = '금지된 요청입니다 (Forbidden)';
          break;
        case 404:
          err.message = '찾을 수 없습니다 (NotFound)';
          break;
        case 405:
          err.message = '허용되지 않는 메서드입니다 (MethodNotAllowed)';
          break;
        case 408:
          err.message = '요청 시간이 초과되었습니다 (RequestTimeout)';
          break;
        default:
          err.message = `예기치 않은 오류: ${status}`;
      }
    } else if (err.request) {
      err.message = '응답이 없습니다'; // 요청이 이루어졌으나 응답이 없음
    } else {
      err.message = '오류가 발생했습니다'; // 요청 설정 중 오류 발생
    }
  } else {
    err.message = '네트워크 오류'; // 네트워크 오류
  }
  return Promise.reject(err);
};

export default errorHandler;
