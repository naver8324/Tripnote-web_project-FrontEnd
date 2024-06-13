import React, { useState } from 'react';
import SpotDndCard from '../rootCreateSpotList/SpotDndCard';
import useMapCreateStore from '../../store/useMapCreateStore';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Modal from '../Modal/Modal';
import useHashTag from '../../Hooks/posts/useHashTag'; // 추가
import { ToastAlert } from '../commons/ToastAlert';
import { useNavigate } from 'react-router-dom';
import useCreateRoute from '../../Hooks/routes/useCreateRoute';
import NextSpotRecommend from "../SpotSearchList/NextSpotRecommend.jsx";

export default function BarRootCreate() {
  const navigate = useNavigate();
  const routeSpots = useMapCreateStore((state) => state.routeSpots);
  const setRouteSpots = useMapCreateStore((state) => state.setRouteSpots);
  const setMarkers = useMapCreateStore((state) => state.setMarkers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [routeName, setRouteName] = useState('');
  const {
    Hashtags: themeTags,
    error: themeError,
    loading: themeLoading,
  } = useHashTag(false); // 테마 해시태그
  const { createRoute, loading: createLoading } = useCreateRoute(); // 추가

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

  const removeSpot = (index) => {
    const updatedSpots = [...routeSpots];
    updatedSpots.splice(index, 1);
    setRouteSpots(updatedSpots);
    const newMarkers = updatedSpots.map((spot, i) => ({
      latitude: spot.lat,
      longitude: spot.lng,
      id: spot.id,
      index: i + 1,
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

  const handleRouteSave = async () => {
    const spotIds = routeSpots.map((spot) => spot.id);
    const hashtagIds = selectedHashtags.map(
      (tag) => themeTags.find((t) => `#${t.name}` === tag).id,
    );

    const routeData = {
      name: routeName,
      spotIds,
      hashtagIds,
    };

    try {
      await createRoute(routeData);
      // 경로 생성 성공 후 상태 초기화
      setRouteSpots([]);
      setMarkers([]);
      setSelectedHashtags([]);
      setRouteName('');
      setIsModalOpen(false);
      ToastAlert('경로 추가가 완료되었습니다', 'success');
      navigate('/mypage');
    } catch (error) {
      ToastAlert('경로 저장 중 오류가 발생했습니다', 'error');
    }
  };

  const isSaveEnabled = routeName.length > 0 && selectedHashtags.length > 0;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-[340px] m-5 h-[calc(100vh-150px)] overflow-y-auto">
        <p className="text-lg">스팟을 드래그하여 경로를 만들어보세요!</p>
        {routeSpots.map((spot, index) => (
          <SpotDndCard
            key={spot.id}
            spot={spot}
            index={index}
            moveSpot={moveSpot}
            removeSpot={removeSpot}
          />
        ))}
        {routeSpots.length > 0 && (
          <NextSpotRecommend
            spotId = {routeSpots[routeSpots.length - 1].id}
          />
        )}
        <div className="flex justify-end m-4">
          <button
            className={`mt-4 px-4 py-2 text-white rounded-lg ${
              routeSpots.length < 2 ? 'bg-gray-300' : 'bg-prime'
            }`}
            disabled={routeSpots.length < 2}
            onClick={handleCreateRoute}
          >
            경로 생성 완료
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Modal>
          <h2>만드신 경로의 이름을 지어주세요!</h2>
          <input
            type="text"
            value={routeName}
            onChange={(e) => setRouteName(e.target.value)}
            className="w-full p-2 mt-2 mb-4 border rounded"
          />
          <h3 className="mt-4 text-lg">테마 해시태그</h3>
          {themeLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex flex-wrap">
              {themeTags.map((hashtag) => (
                <button
                  key={hashtag.id}
                  className={`m-2 p-2 rounded-2xl ${
                    selectedHashtags.includes(`#${hashtag.name}`)
                      ? 'bg-prime text-white'
                      : 'bg-white shadow'
                  }`}
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
              className={`px-4 py-2 rounded-lg mr-2 ${
                isSaveEnabled
                  ? 'bg-green-400 text-white hover:bg-prime'
                  : 'bg-gray-300'
              }`}
              disabled={!isSaveEnabled}
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
      {/* 다음 추천 여행지 컴포넌트 위치*/}
    </DndProvider>
  );
}
