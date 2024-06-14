import React from 'react';

export default function ReviewCard({ backGroundImg, title, content, likes }) {
  return (
    <div
      className="h-full w-[800px] bg-cover bg-no-repeat lg:rounded-lg 2xl:rounded-xl"
      style={{ backgroundImage: `url(${backGroundImg})` }}
    >
      <div className="flex h-full flex-col items-start justify-between p-6 lg:px-20 lg:py-10">
        <div className="flexCenter gap-4">
          <div className="flex flex-col gap-2 mt-4">
            <h4 className="text-2xl font-[700] text-white">{title}</h4>
            <p className="text-2xl font-[300] text-white">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}