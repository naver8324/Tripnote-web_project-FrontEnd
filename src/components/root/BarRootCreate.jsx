import React, { useState } from 'react';
import SpotDndCard from '../rootCreateSpotList/SpotDndCard';
import useMapCreateStore from '../../store/useMapCreateStore';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Modal from '../Modal/Modal';
import useHashTag from '../../Hooks/posts/useHashTag'; // 추가
import { ToastAlert } from '../commons/ToastAlert';
import { useNavigate } from 'react-router-dom';

export default function BarRootCreate() {
  const navigate = useNavigate();
  const routeSpots = useMapCreateStore((state) => state.routeSpots);
  const setRouteSpots = useMapCreateStore((state) => state.setRouteSpots);
  const setMarkers = useMapCreateStore((state) => state.setMarkers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const {
    Hashtags: themeTags,
    error: themeError,
    loading: themeLoading,
  } = useHashTag(false); // 테마 해시태그

  const moveSpot = (fromIndex, toIndex) => {
    const updatedSpots = [...routeSpots];
    const [movedSpot] = updatedSpots.splice(fromIndex, 1);
    updatedSpots.splice(toIndex, 0, movedSpot);
    setRouteSpots(updatedSpots);
    const newMarkers = updatedSpots.map((spot, index) => ({
      latitude: spot.lat,
      longitude: spot.lng,
      id: spot.id,
      index: index + 1,
    }));
    setMarkers(newMarkers);
  };

  const handleCreateRoute = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleHashtagSelect = (hashtag) => {
    setSelectedHashtags((prev) =>
      prev.includes(hashtag)
        ? prev.filter((tag) => tag !== hashtag)
        : [...prev, hashtag],
    );
  };

  const handleRouteSave = () => {
    // 해시태그를 포함한 경로 정보 저장 로직 추가
    console.log('Selected Hashtags:', selectedHashtags);
    console.log('Route Spots:', routeSpots);

    // 전역 상태로 저장
    useMapCreateStore.setState({
      savedRoutes: [
        ...useMapCreateStore.getState().savedRoutes,
        { spots: routeSpots, hashtags: selectedHashtags },
      ],
    });

    setIsModalOpen(false);
    ToastAlert('경로 추가가 완료되었습니다', 'success');
    navigate('/mypage');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-[340px] m-5">
        <p className="text-lg">스팟을 드래그하여 경로를 만들어보세요!</p>
        {routeSpots.map((spot, index) => (
          <SpotDndCard
            key={spot.id}
            spot={spot}
            index={index}
            moveSpot={moveSpot}
          />
        ))}
        <div className="flex justify-end m-4">
          <button
            className={`mt-4 px-4 py-2 text-white rounded-lg  ${routeSpots.length < 2 ? 'bg-gray-300' : 'bg-prime'}`}
            disabled={routeSpots.length < 2}
            onClick={handleCreateRoute}
          >
            경로 생성 완료
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Modal>
          <h2>경로와 관련된 해시태그를 추가해주세요!</h2>
          {themeLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="w-[600px]">
              <h3 className="mt-4 text-lg">테마 해시태그</h3>
              {themeTags.map((hashtag) => (
                <button
                  key={hashtag.id}
                  className={`m-2 p-2 rounded-2xl ${selectedHashtags.includes(`#${hashtag.name}`) ? 'bg-prime text-white ' : 'bg-white shadow'}`}
                  onClick={() => handleHashtagSelect(`#${hashtag.name}`)}
                >
                  #{hashtag.name}
                </button>
              ))}
            </div>
          )}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleRouteSave}
              className="px-4 py-2 bg-green-400 text-white rounded-lg mr-2 hover:bg-prime"
            >
              저장
            </button>
            <button
              onClick={handleModalClose}
              className="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500"
            >
              닫기
            </button>
          </div>
        </Modal>
      )}
    </DndProvider>
  );
}
