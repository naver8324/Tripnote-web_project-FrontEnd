import React from 'react';
import profile from '../../assets/profile.png';
import { formmateDate } from '../../utils/date';
import { Link } from 'react-router-dom';

export default function PostCard({ contents }) {
  const { id, nickname, createdAt, title, content, hashtagResponseDTOList } =
    contents;

  // thumbnail용 첫 번째 이미지 url추출
  const firstImageMatch = content.match(/<img[^>]+src="([^">]+)"/);
  const firstImageUrl = firstImageMatch ? firstImageMatch[1] : '';

  // text만 추출
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const textContent = doc.body.textContent || '';

  return (
    <Link
      to={`/post/${id}`}
      className="flex gap-8 items-center border-b border-grey pb-5 mb-4"
    >
      <div className="w-full">
        <div className="flex gap-2 items-center mb-7">
          <img
            src={profile}
            alt="profile image"
            className="w-6 h-6 rounded-full"
          />
          <p className="line-clamp-1">{nickname}</p>
          <p className="min-w-fit">{formmateDate(createdAt)}</p>
        </div>
        <h1 className="text-xl">{title}</h1>
        {/* <p
          className="my-3 leading-6 line-clamp-3 max-sm:hidden md:max-[1100px]:hidden"
          dangerouslySetInnerHTML={{ __html: content }}
        /> */}
        <p className="my-3 leading-6 line-clamp-3 max-sm:hidden md:max-[1100px]:hidden">
          {textContent}
        </p>
        <div className="flex gap-2 mt-3 flex-wrap">
          {hashtagResponseDTOList?.map((hashtag) => (
            <span
              key={hashtag.id}
              className="text-sm py-1 px-3 rounded-full bg-gray-100"
            >
              #{hashtag.name}
            </span>
          ))}
        </div>
      </div>
      {firstImageUrl && (
        <div className="h-28 aspect-square bg-gray-100">
          <img
            src={firstImageUrl}
            alt="thumbnail"
            className="w-full h-full aspect-square object-cover"
          />
        </div>
      )}
    </Link>
  );
}
