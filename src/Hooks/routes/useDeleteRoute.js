import { ToastAlert } from "../../components/commons/ToastAlert";
import useAxios from "../useAxios";

const useDeleteRoute = () => {
  const { fetchData } = useAxios({
    method: 'DELETE',
    url: '',
    shouldFetch: false,
  });

  const deleteRoute = async (routeId) => {
    try {
      const response = await fetchData({}, `/api/member/routes/${routeId}`);
      return response;
      
    } catch (error) {
      ToastAlert('경로 삭제를 실패하였습니다.', 'error');
      throw error;
    }
  };

  return deleteRoute;
};

export default useDeleteRoute;
