import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import mockImg from '../../assets/profile.png';
import NaverMap from '../../components/Map/NaverMap';
import { formmateDate } from '../../utils/date';
import useDetailPost from '../../Hooks/posts/useDetailPost';
import Spinner from '../commons/Spinner';
import { ToastAlert } from '../commons/ToastAlert';
import PostInteraction from './PostInteraction';

export default function PostDetail() {
  const { postId } = useParams();
  const { detailPost, error, loading, refetch } = useDetailPost(postId);

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return ToastAlert(`${error.message}`, 'error');
  }
  if (!detailPost) {
    return <div>No data available</div>;
  }

  const {
    id,
    routeId,
    title,
    nickname,
    createdAt,
    content,
    hashtagResponseDTOList,
    likes,
    likedAt,
    markedAt,
    reportedAt,
  } = detailPost;

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
              <span
                key={hashtag.id}
                className="text-sm py-1 px-4 rounded-full bg-gray-100"
              >
                #{hashtag.name}
              </span>
            ))}
          </div>
        </div>
        <PostInteraction
          id={id}
          likes={likes}
          likedAt={likedAt}
          markedAt={markedAt}
          reportedAt={reportedAt}
        />
      </div>
    </div>
  );
}
