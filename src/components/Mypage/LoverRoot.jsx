import React, { useEffect, useState } from 'react';
import Spinner from '../commons/Spinner';
import Pagination from '../commons/Pagination';
import useGetMyMarkedRoute from '../../Hooks/mypage/useGetMyMarkedRoute';
import NoData from '../../pages/Board/NoData';
import NaverMap from '../Map/NaverMap';
import noimage from '../../assets/noimage.png';

const LoverRoot = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const { markedRoute, error, loading, refetch, updateParams } =
    useGetMyMarkedRoute(currentPage, pageSize);

  useEffect(() => {
    updateParams({ page: currentPage, size: pageSize });
  }, [currentPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;
  if (!markedRoute || !markedRoute.content || markedRoute.content.length === 0)
    return (
      <div className="w-[840px]">
        <NoData message="북마크한 경로가 없습니다." />
      </div>
    );

  const totalElements = markedRoute.totalElements;
  const totalPage = Math.ceil(totalElements / pageSize);
  const routes = markedRoute?.content;

  return (
    <div className="w-[840px]">
      <div className=" flex flex-col mt-4 text-title">
        {routes.map((route) => (
          <div className="border-b my-8" key={route.routeId}>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl">{route.name}</h2>
              {/* <button onClick={() => handleDeleteRoute(route.routeId)}>
            <GoTrash className="text-red-400 text-2xl" />
          </button> */}
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
            <div className="flex space-x-2 p-2"></div>
          </div>
        ))}
        {totalPage > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default LoverRoot;
