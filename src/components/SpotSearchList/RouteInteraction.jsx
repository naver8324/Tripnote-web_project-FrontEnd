import React from 'react';
import {
  GoHeart,
  GoHeartFill,
  GoBookmark,
  GoBookmarkFill,
} from 'react-icons/go';
import useRouteToggleLike from '../../Hooks/routes/useRouteToggleLike';
import useRouteToggleBookmark from '../../Hooks/routes/useRouteToggleBookmark';
import useAuthStore from '../../store/useAuthStore'; // 인증 상태를 가져오기 위해 추가
import { ToastAlert } from '../commons/ToastAlert';

const RouteInteraction = ({
  routeId,
  liked,
  bookmarked,
  onToggleLike,
  onToggleBookmark,
}) => {
  const { toggleLike, loading: likeLoading } = useRouteToggleLike(routeId);
  const { toggleBookmark, loading: bookmarkLoading } =
    useRouteToggleBookmark(routeId);
  const isAuth = useAuthStore((state) => state.isAuth); // 인증 상태 가져오기

  const handleLike = async (e) => {
    e.stopPropagation(); // 이벤트 전파 중지
    if (!isAuth) {
      ToastAlert('로그인이 필요한 기능입니다', 'error');
      return;
    }
    await toggleLike();
    onToggleLike();
  };

  const handleBookmark = async (e) => {
    e.stopPropagation(); // 이벤트 전파 중지
    if (!isAuth) {
      ToastAlert('로그인이 필요한 기능입니다', 'error');
      return;
    }
    await toggleBookmark();
    onToggleBookmark();
  };

  return (
    <div className="flex space-x-4 mt-2">
      <button
        onClick={handleLike}
        className={liked ? 'text-red-400' : 'text-title'}
        disabled={likeLoading}
      >
        {liked ? <GoHeartFill /> : <GoHeart />}
      </button>
      <button
        onClick={handleBookmark}
        className={bookmarked ? 'text-blue-400' : 'text-title'}
        disabled={bookmarkLoading}
      >
        {bookmarked ? <GoBookmarkFill /> : <GoBookmark />}
      </button>
    </div>
  );
};

export default RouteInteraction;
