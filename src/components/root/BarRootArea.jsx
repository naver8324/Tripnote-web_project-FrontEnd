import React, { useState, useEffect } from 'react';
import PostModal from '../Modal/PostModal';
import useSpotRoutes from '../../Hooks/routes/useSpotRoutes';
import NoData from './../../pages/Board/NoData';

export default function BarRootArea({ selectedRegion }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {
    responseData: routes,
    error,
    loading,
  } = useSpotRoutes(selectedRegion);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="p-4 w-[340px]">
      <p className="m-t text-xl font-medium">지역 추천 경로</p>
      {loading && <p>Loading...</p>}
      {error && <p>Error loading routes: {error.message}</p>}
      {routes && routes.length > 0 ? (
        <ul>
          {routes.map((route) => (
            <li key={route.id}>{route.name}</li>
          ))}
        </ul>
      ) : (
        !loading && (
          <p>
            <NoData message={'No data!'} />
          </p>
        )
      )}
      <PostModal isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  );
}
