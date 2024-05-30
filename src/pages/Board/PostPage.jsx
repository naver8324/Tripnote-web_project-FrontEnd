import React from 'react';
import { useParams } from 'react-router-dom';
import mockImg from '../../assets/profile.png';
import NaverMap from '../../components/Map/NaverMap';
import { formmateDate } from '../../utils/date';

export const postStructure = {
  title: '',
  des: '',
  content: [],
  tags: [],
  author: { personalInfo: {} },
  time: '',
};

const mockDate = new Date();

export default function PostPage() {
  const { postId } = useParams();

  return (
    <section className="mt-40">
      <div className="max-w-[900px] center pb-10 max-lg:px-[5vw] text-title">
        <NaverMap className="aspect-video w-[800px] h-[200px]" />
        <div className="mt-12">
          <h1 className="text-xl font-semibold">
            What is Lorem Ipsum? <hr className="border-b border-prime inline-block w-full" />
          </h1>
          <div className="flex max-sm:flex-col justify-between my-8">
            <div className="flex gap-2 items-start">
              <img src={mockImg} alt="" className="w-6 h-6 rounded-full" />
              <p>
                닉네임
                <br />
                <p className="text-sm mt-2 opacity-70">{formmateDate(mockDate)}</p>
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
