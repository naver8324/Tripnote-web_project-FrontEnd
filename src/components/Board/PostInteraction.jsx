import React, { useState } from 'react';
import { GoHeart, GoHeartFill, GoBookmark, GoBookmarkFill } from 'react-icons/go';
import useInteractionPost from '../../Hooks/posts/useInteractionPost';

export default function PostInteraction({ id, likes, likedAt, markedAt, reportedAt }) {
  const [userLike, setUserLike] = useState(likedAt !== null);
  const [userBookmark, setUserBookmark] = useState(markedAt !== null);

  const { interact: likeInteract } = useInteractionPost(id, 'like');
  const { interact: bookmarkInteract } = useInteractionPost(id, 'mark');

  const handleLike = async () => {
    await likeInteract();
    setUserLike((prev) => !prev);
  };

  const handleBookmark = async () => {
    await bookmarkInteract();
    setUserBookmark((prev) => !prev);
  };

  return (
    <div className="mt-10 p-4 border-t border-b border-gray flex justify-between items-center gap-4">
      <div className="flex space-x-4">
        <button
          onClick={handleLike}
          className={userLike ? 'text-red-400' : 'text-title'}
        >
          {userLike ? <GoHeartFill /> : <GoHeart />}
        </button>
        <p>{likes}</p>
        <button
          onClick={handleBookmark}
          className={userBookmark ? 'text-red-400' : 'text-title'}
        >
          {userBookmark ? <GoBookmarkFill /> : <GoBookmark />}
        </button>
      </div>
      <div className="border border-grey-300 rounded-full w-8 h-8 flex justify-center items-center">
        <p className="text-xs">0</p>
      </div>
    </div>
  );
}