import React from 'react';
import {
  GoHeart,
  GoHeartFill,
  GoBookmark,
  GoBookmarkFill,
} from 'react-icons/go';
import useRouteToggleLike from '../../Hooks/routes/useRouteToggleLike';
import useRouteToggleBookmark from '../../Hooks/routes/useRouteToggleBookmark';

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

  const handleLike = async () => {
    await toggleLike();
    onToggleLike();
  };

  const handleBookmark = async () => {
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
