import React, { useState } from 'react';
import Button from '../commons/Button';
import { Link, useNavigate } from 'react-router-dom';
import { GoArrowLeft } from 'react-icons/go';
import Editor from './Editor';
import useSavePost from '../../Hooks/posts/useSavePost';
import { ToastAlert } from '../commons/ToastAlert';

export default function BoardEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { createPost } = useSavePost();
  const navigate = useNavigate();

  const handleSavePost = async () => {
    if (!title) {
      ToastAlert('제목을 입력해주세요.', 'error');
      return;
    }
    if (!content) {
      ToastAlert('내용을 입력해주세요.', 'error');
      return;
    }
    try {
      createPost(title, content);
      navigate('/board');
    } catch (error) {
      ToastAlert('게시글 작성을 실패했습니다.', 'error');
    }
  };

  return (
    <div className="w-[840px] flex-col justify-center items-center">
      <nav className="navBar flex items-center justify-between">
        <Link to="/board">
          <GoArrowLeft className="text-xl" />
        </Link>
        <div className="flex space-x-2">
          <Button
            onClick={handleSavePost}
            variant="roundButton"
            size="medium"
            className="bg-prime text-white border-none"
          >
            저장
          </Button>
          <Button
            variant="roundButton"
            size="medium"
            className="bg-subBackground"
          >
            수정
          </Button>
        </div>
      </nav>
      <Editor
        postTitle={title}
        postContent={content}
        setPostTitle={setTitle}
        setPostContent={setContent}
      />
    </div>
  );
}
