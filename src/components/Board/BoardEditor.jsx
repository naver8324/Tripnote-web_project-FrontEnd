import React from 'react';
import Button from '../commons/Button';
import { Link } from 'react-router-dom';
import { GoArrowLeft } from 'react-icons/go';
import ReactQuill from 'react-quill';
import Editor from './Editor';

export default function BoardEditor() {
  return (
    <div className='w-[840px] flex-col justify-center items-center'>
      <nav className="navBar flex items-center justify-between">
        <Link to="/board">
          <GoArrowLeft className="text-xl"/>
        </Link>
        <div className='flex space-x-2'>
          <Button variant='roundButton' size='medium' className='bg-prime text-white border-none'>저장</Button>
          <Button variant='roundButton' size='medium' className='bg-subBackground'>수정</Button>
        </div>
      </nav>
      <Editor />
    </div>
  );
}
