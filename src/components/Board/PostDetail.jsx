import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import mockImg from '../../assets/profile.png';
import NaverMap from '../../components/Map/NaverMap';
import { formmateDate } from '../../utils/date';
import { GoHeart } from 'react-icons/go';
import { GoHeartFill } from 'react-icons/go';
import { GoBookmark } from 'react-icons/go';
import { GoBookmarkFill } from 'react-icons/go';
import useDetailPost from '../../Hooks/posts/useDetailPost';

export default function PostDetail() {
  const { postId } = useParams();
  const { detailPost, error, loading, refetch } = useDetailPost(postId);
  const [userLike, setUserLike] = useState(false);
  const [userBookmark, setUserBookmark] = useState(false);
  
  // 로딩 상태 처리
  if (loading) {
    return <div>Loading...</div>;
  }

  // 에러 상태 처리
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // 데이터가 없는 경우 처리
  if (!detailPost) {
    return <div>No data available</div>;
  }

  // 데이터 구조 분해 할당
  const { routeId, title, nickname, createdAt, content, hashtagResponseDTOList } = detailPost;

  const handleLike = () => {
    setUserLike((prev) => !prev);
  };

  const handleBookmark = () => {
    setUserBookmark((prev) => !prev);
  };

  return (
    <div className="w-[900px] center pb-10 max-lg:px-[5vw] text-title">
      {/* <NaverMap className="aspect-video h-[200px]" /> */}
      <div className="mt-12">
        <div className="">
          <h1 className="text-xl font-semibold">{title}</h1>
          <div className="flex gap-2 items-start mt-4">
            <img src={mockImg} alt="" className="w-6 h-6 rounded-full" />
            <p className="text-sm opacity-70">
              {`${nickname} · ${formmateDate(createdAt)}`}
            </p>
          </div>
          <hr className="border-b border-prime inline-block w-full" />
        </div>
        <div className="m-3 leading-7">
          <p>{content}</p>
          <div className="flex space-x-3 mt-7">
            {(hashtagResponseDTOList || []).map((hashtag) => (
              <span key={hashtag.id} className="text-sm py-1 px-4 rounded-full bg-gray-100">
                #{hashtag.name}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-10 p-4 border-t border-b border-gray flex justify-between items-center gap-4">
          <div className="flex space-x-4">
            <button onClick={handleLike} className={userLike ? 'text-red-400' : 'text-title'}>
              {userLike ? <GoHeartFill /> : <GoHeart />}
            </button>
            <button onClick={handleBookmark} className={userBookmark ? 'text-red-400' : 'text-title'}>
              {userBookmark ? <GoBookmarkFill /> : <GoBookmark />}
            </button>
          </div>
          <div className="border border-grey-300 rounded-full w-8 h-8 flex justify-center items-center">
            <p className="text-xs">0</p>
          </div>
        </div>
      </div>
    </div>
  );
}