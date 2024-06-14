import React, { useEffect, useState, useRef } from 'react';
import {
  GoHeart,
  GoHeartFill,
  GoBookmark,
  GoBookmarkFill,
} from 'react-icons/go';
import useInteractionPost from '../../Hooks/posts/useInteractionPost';
import useGetComment from '../../Hooks/posts/useGetComment';
import useDebounce from '../../Hooks/useDebounce';

export default function PostInteraction({
  id,
  likes,
  likedAt,
  markedAt,
  reportedAt,
  nickname
}) {
  const userNickname = localStorage.getItem('userNickname');
  const [userLike, setUserLike] = useState(likedAt !== null);
  const [userBookmark, setUserBookmark] = useState(markedAt !== null);
  const prevUserLike = useRef({ current: likedAt !== null }); //current가 상태가 업데이트된다고 초기화가되지않는다.(= 재선언의 상태변경의 영향을 받지않기위해 useRef사용)
  const { interact: likeInteract, error: likeError } = useInteractionPost(
    id,
    'like',
  );
  const { interact: bookmarkInteract } = useInteractionPost(id, 'mark');

  const handleLike = async () => {
    const resultUserLike = !userLike;
    likeInteract().then(() => (prevUserLike.current = resultUserLike));
    setUserLike(resultUserLike);
  };

  useEffect(() => {
    if (likeError) {
      setUserLike(prevUserLike.current); // 초기값으로 원복시킨다.
    }
  }, [likeError]);
  // Optimistic UI(react-query에 옵션으로 할 수도 있다.) => useInteractionPost에서 추상화하면 좋을듯!

  const [commentsCount, setCommentsCount] = useState(0);
  const handleBookmark = async () => {
    await bookmarkInteract();
    setUserBookmark((prev) => !prev);
  };

  const debounceHandleLike = useDebounce(handleLike, 300);
  const debounceHandleBookmark = useDebounce(handleBookmark, 300);

  const { comments } = useGetComment(id);
  useEffect(() => {
    if (comments?.numberOfElements !== undefined) {
      setCommentsCount(comments.numberOfElements);
    }
  }, [comments]);

  const isDisabled = nickname === userNickname;

  return (
    <div className="mt-10 p-4 border-t border-b border-gray flex justify-between items-center gap-4">
      <div className="flex space-x-4">
        <button
          onClick={debounceHandleLike}
          className={`${userLike ? 'text-red-400' : 'text-title'} ${isDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={isDisabled}
        >
          {userLike ? <GoHeartFill /> : <GoHeart />}
        </button>
        {/* <p>{likes}</p> */}
        <button
          onClick={debounceHandleBookmark}
          className={`${userBookmark ? 'text-red-400' : 'text-title'} ${isDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={isDisabled}
        >
          {userBookmark ? <GoBookmarkFill /> : <GoBookmark />}
        </button>
      </div>
      <div className=" w-8 h-8 flex justify-center items-center">
        {/* <p className="text-xs">{commentsCount}</p> */}
      </div>
    </div>
  );
}