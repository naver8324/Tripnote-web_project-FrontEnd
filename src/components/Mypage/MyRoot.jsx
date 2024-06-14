import React, { useState, useEffect } from 'react';
import useFetchRoutes from '../../Hooks/routes/useFetchRoutes';
import Spinner from '../commons/Spinner';
import Button from '../commons/Button';
import { GoTrash } from 'react-icons/go';
import NoData from '../../pages/Board/NoData';
import useDeleteRoute from '../../Hooks/routes/useDeleteRoute';
import { ToastAlert } from '../commons/ToastAlert';
import Pagination from '../commons/Pagination';
import { useNavigate } from 'react-router-dom';
import CustomConfirmModal from '../Modal/CustomConfirmModal';
import noimage from '../../assets/noimage.png';

const MyRoot = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const { routesData, error, loading, refetch, updateParams } = useFetchRoutes(
    currentPage,
    pageSize,
  );
  const deleteRoute = useDeleteRoute();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedRouteId, setSelectedRouteId] = useState(null);

  useEffect(() => {
    updateParams({ page: currentPage, size: pageSize });
  }, [currentPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleDeleteRoute = async () => {
    try {
      await deleteRoute(selectedRouteId);
      ToastAlert('경로가 삭제되었습니다.', 'success');
      refetch();
    } catch (error) {
      ToastAlert('경로 삭제 실패', 'error');
    } finally {
      setIsConfirmModalOpen(false);
      setSelectedRouteId(null);
    }
  };

  const openConfirmModal = (routeId) => {
    setSelectedRouteId(routeId);
    setIsConfirmModalOpen(true);
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;
  if (!routesData || !routesData.content || routesData.content.length === 0)
    return (
      <div className="w-[840px]">
        <NoData message="생성된 경로가 없습니다." />
      </div>
    );

  const totalElements = routesData.totalElements;
  const totalPage = Math.ceil(totalElements / pageSize);

  const handleRoutePost = (routeId) => {
    navigate('/editBoard', { state: { routeId } });
  };

  return (
    <div className="w-[840px] mt-4 text-title">
      {routesData.content.map((route) => (
        <div className="border-b my-8" key={route.routeId}>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl">{route.name}</h2>
            <button onClick={() => openConfirmModal(route.routeId)}>
              <GoTrash className="text-red-400 text-2xl" />
            </button>
          </div>
          <div className="flex flex-wrap">
            {route.spots.map((spot) => (
              <div key={spot.id} className="m-2">
                <div className="relative group w-[100px] h-[100px] mt-4">
                  <img
                    src={spot.imageUrl}
                    onError={(e) => {
                      e.target.onerror = null; // 무한 루프 방지
                      e.target.src = noimage;
                    }}
                    alt={noimage}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white p-2">{spot.location}</span>
                  </div>
                </div>
                <h3 className="text-sm mt-2 truncate w-[100px]">
                  {spot.location}
                </h3>
              </div>
            ))}
          </div>
          <div className="flex space-x-2 p-2">
            <Button
              onClick={() => handleRoutePost(route.routeId)}
              className={`text-sm px-4 py-2 ${route.postId !== null ? 'bg-gray-200 cursor-not-allowed' : 'bg-prime text-white'}`}
              disabled={!!route.postId}
            >
              {route.postId !== null ? '후기 작성 완료' : '경로 후기 작성'}
            </Button>
          </div>
        </div>
      ))}
      {totalPage > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          onPageChange={handlePageChange}
        />
      )}
      <CustomConfirmModal
        isOpen={isConfirmModalOpen}
        onRequestClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleDeleteRoute}
        onCancel={() => setIsConfirmModalOpen(false)}
        title={`삭제 확인`}
        message={`정말로 이 경로를 삭제하시겠습니까?`}
      />
    </div>
  );
};

export default MyRoot;
