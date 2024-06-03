import React, { useState }  from 'react';
import { useParams } from 'react-router-dom';
import mockImg from '../../assets/profile.png';
import NaverMap from '../../components/Map/NaverMap';
import { formmateDate } from '../../utils/date';
import { GoHeart } from 'react-icons/go';
import { GoHeartFill } from "react-icons/go";
import { GoBookmark } from 'react-icons/go';
import { GoBookmarkFill } from "react-icons/go";

export const postStructure = {
  title: '',
  des: '',
  content: [],
  tags: [],
  author: { personalInfo: {} },
  time: '',
};

const mockDate = new Date();

export default function PostDetail() {
  const { postId } = useParams();
  const [userLike, setUserLike] = useState(false);
  const [userBookmark, setUserBookmark] = useState(false);

  const handleLike = () => {
    setUserLike((prev) => !prev);
  };

  const handleBookmark = () => {
    setUserBookmark((prev) => !prev)
  }
  return (
    <div className="max-w-[900px] center pb-10 max-lg:px-[5vw] text-title">
        <NaverMap className="aspect-video h-[200px]" />
        <div className="mt-12">
          <div className="">
            <h1 className="text-xl font-semibold">What is Lorem Ipsum? </h1>
            <div className="flex gap-2 items-start mt-4">
              <img src={mockImg} alt="" className="w-6 h-6 rounded-full" />
              <p className="text-sm opacity-70">
                {`닉네임 · ${formmateDate(mockDate)}`}
              </p>
            </div>
            <hr className="border-b border-prime inline-block w-full" />
          </div>
          <div className="m-3 leading-7">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <div className="gap-3 mt-7">
              <span className="text-sm py-1 px-4 rounded-full bg-gray-100">
                #혼자여행
              </span>
            </div>
          </div>
          <div className="mt-10 p-4 border-t border-b border-gray flex justify-between items-center gap-4">
            <div className="flex space-x-4">
              <button onClick={handleLike} className={(userLike ? 'text-red-400' : 'text-title')}>
                {userLike ? <GoHeartFill /> : <GoHeart />}                
              </button>
              <button onClick={handleBookmark} className={(userBookmark ? 'text-red-400' : 'text-title')}>
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

