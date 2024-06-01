import React from 'react';
import logoWhite from '../../assets/logo-white.png';
import { FaFigma } from 'react-icons/fa';
import { IoLogoGitlab } from 'react-icons/io5';
import { SiNotion } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="bg-title text-gray-200 flex justify-between py-20 px-20 mt-auto left-0 w-full">
      <div className="text-xs font-light">
        <img className="w-28 pb-10" src={logoWhite} alt="Elice" />
        <div className="font-medium">
          <h1 className="font-semibold">Team 01</h1>
          <p>BE - 정유경 김수현 백지민 조부건 정주용</p>
          <p className="pb-5">FE - 김도현 오성현</p>
          <p>Elice, cloud track 02</p>
          <p>서울 성동구 아차산로17길 48 성수낙낙 2층 엘리스랩 성수점</p>
          <p className="">Copyright © 2024 Elice Lab. All rights reserved.</p>
        </div>
      </div>
      <nav className="flex gap-4 text-2xl">
        <a href="https://www.figma.com/">
          <FaFigma />
        </a>
        <a href="https://gitlab.com/">
          <IoLogoGitlab />
        </a>
        <a href="https://www.notion.so/">
          <SiNotion />
        </a>
      </nav>
    </footer>
  );
}
