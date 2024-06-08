import React, { useEffect, useState, useRef } from 'react';
import { GoHeart, GoHeartFill, GoBookmark, GoBookmarkFill } from 'react-icons/go';
import useInteractionPost from '../../Hooks/posts/useInteractionPost';

export default function PostInteraction({ id, likes, likedAt, markedAt, reportedAt }) {
  const [userLike, setUserLike] = useState(likedAt !== null);
  const [userBookmark, setUserBookmark] = useState(markedAt !== null);
  const prevUserLike = useRef({current: likedAt !== null}); //current가 상태가 업데이트된다고 초기화가되지않는다.(= 재선언의 상태변경의 영향을 받지않기위해 useRef사용)
  const { interact: likeInteract, error: likeError } = useInteractionPost(id, 'like');
  const { interact: bookmarkInteract } = useInteractionPost(id, 'mark');

  const handleLike = async () => {
    const resultUserLike = !userLike;
    likeInteract().then(() => prevUserLike.current = resultUserLike);
    setUserLike(resultUserLike);
  };

  useEffect(() => {
    if(likeError){
      setUserLike(prevUserLike.current); //초기값으로 원복시킨다.
    }
  }, [likeError])
   // Optimistic UI(react-query에 옵션으로 할 수도 있다.) => useInteractionPost에서 추상화하면 좋을듯!

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
        {/* <p>{likes}</p> */}
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