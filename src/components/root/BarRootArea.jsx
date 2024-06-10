import React, { useState, useEffect } from 'react';
import PostModal from '../Modal/PostModal';
import useSpotRoutes from '../../Hooks/routes/useSpotRoutes';

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
      <p className="text-lg font-medium">지역 추천 경로</p>
      {loading && <p>Loading...</p>}
      {error && <p>Error loading routes: {error.message}</p>}
      {routes && routes.length > 0 ? (
        <ul>
          {routes.map((route) => (
            <li key={route.id}>{route.name}</li>
          ))}
        </ul>
      ) : (
        !loading && <p>No routes available for the selected region.</p>
      )}
      <button
        onClick={openModal}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
      >
        게시물 상태보기
      </button>
      <PostModal isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  );
}
