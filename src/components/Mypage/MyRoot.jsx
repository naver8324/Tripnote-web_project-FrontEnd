import React from 'react';
import useFetchRoutes from '../../Hooks/routes/useFetchRoutes';
import Spinner from '../commons/Spinner';
import Button from '../commons/Button';
import { GoTrash } from 'react-icons/go';
import NoData from '../../pages/Board/NoData';

const MyRoot = () => {
  const { routes, error, loading } = useFetchRoutes();
  // const [currentPage, setCurrentPage] = useState(1);
  // const handlePageChange = (event, page) => {
  //   setCurrentPage(page);
  // };

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;
  if (!routes || routes.length === 0)
    return <NoData message="생성된 경로가 없습니다." />;

  return (
    <div className="w-[840px] mt-4 text-title">
      {routes.map((route) => (
        <div className="border-b my-8" key={route.routeId}>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl">{route.name}</h2>
            <GoTrash className="text-red-400 text-2xl" />
          </div>
          <div className="flex flex-wrap">
            {route.spots.map((spot) => (
              <div key={spot.routeId} className="m-2">
                <div className="relative group w-[100px] h-[100px] mt-4">
                  <img
                    src={spot.imageUrl}
                    alt={spot.location}
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
            <Button className="text-sm px-4 py-2 bg-prime text-white">
              경로 후기 작성
            </Button>
          </div>
        </div>
      ))}
      {/* {routes !== null && routes.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPage={Math.ceil(
            routes ? routes.totalElements / routes.pageable.pageSize : 0,
          )}
          onPageChange={handlePageChange}
        />
      )} */}
    </div>
  );
};

export default MyRoot;
