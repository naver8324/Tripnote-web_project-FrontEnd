import { HttpStatusCode, isAxiosError } from 'axios';
import { ToastAlert } from '../components/commons/ToastAlert';

const errorHandler = (err) => {
  if (isAxiosError(err)) {
    if (err.response) {
      const { status } = err.response;
      let message = '';
      switch (status) {
        case HttpStatusCode.BadRequest:
          message = '잘못된 요청입니다 (BadRequest)';
          break;
        case HttpStatusCode.Unauthorized:
          message = '인증되지 않았습니다 (Unauthorized)';
          break;
        case HttpStatusCode.Forbidden:
          message = '금지된 요청입니다 (Forbidden)';
          break;
        case HttpStatusCode.NotFound:
          message = '찾을 수 없습니다 (NotFound)';
          break;
        case HttpStatusCode.MethodNotAllowed:
          message = '허용되지 않는 메서드입니다 (MethodNotAllowed)';
          break;
        case HttpStatusCode.RequestTimeout:
          message = '요청 시간이 초과되었습니다 (RequestTimeout)';
          break;
        default:
          message = `예기치 않은 오류가 발생하였습니다.`;
      }
      err.message = message;
    } else if (err.request) {
      const message = '응답이 없습니다'; // 요청이 이루어졌으나 응답이 없음
      err.message = message;
    } else {
      const message = '오류가 발생했습니다'; // 요청 설정 중 오류 발생
      err.message = message;
    }
  } else {
    const message = '네트워크 오류'; // 네트워크 오류
    err.message = message;
  }
  return Promise.reject(err);
};

export default errorHandler;
