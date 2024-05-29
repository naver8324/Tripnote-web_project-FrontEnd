import React from 'react';
import profile from '../../assets/profile.png';
import { formmateDate } from '../../utils/date';
import { Link } from 'react-router-dom';
import mockImg from '../../assets/busan.jpg'

const mockDate = new Date();
const mockHashtag = ['#서울', '#혼자여행'];

export default function PostCard() {
  return (
    <Link to={`/api/member/posts/`} className='flex gap-8 items-center border-b border-grey pb-5 mb-4'>
      <div className="w-full">
        <div className="flex gap-2 items-center mb-7">
          <img
            src={profile}
            alt="profile image"
            className="w-6 h-6 rounded-full"
          />
          {/* 닉네임 한줄 표시 */}
          <p className="line-clamp-1">닉네임</p>
          <p className="min-w-fit">{formmateDate(mockDate)}</p>
        </div>
        <h1 className="text-xl">What is Lorem Ipsum?</h1>
        <p className="my-3 leading-7 line-clamp-3 max-sm:hidden md:max-[1100px]:hidden">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <div className='flex gap-4 mt-7'>
          {mockHashtag.map((i) => (
            <span className="py-1 px-4 rounded-full bg-gray-100">{i}</span>
          ))}
        </div>
      </div>
        <div className='h-28 aspect-square bg-gray-100'>
          <img src={mockImg} alt="" className='w-full h-full aspect-square object-cover'/>
        </div>
    </Link>
  );
}
