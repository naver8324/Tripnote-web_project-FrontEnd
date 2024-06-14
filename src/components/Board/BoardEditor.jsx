import React, { useState } from 'react';
import Button from '../commons/Button';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { GoArrowLeft } from 'react-icons/go';
import Editor from './Editor';
import useSavePost from '../../Hooks/posts/useSavePost';
import { ToastAlert } from '../commons/ToastAlert';
import useUpdatePost from '../../Hooks/posts/useUpdatePost';

export default function BoardEditor() {
  const navigate = useNavigate();
  const location = useLocation();

  const routeIdState = location.state?.routeId;
  const postDetailState = location.state?.postDetail;

  // 작성 버튼 상태 기반으로 직접 url 접근을 제어
  if (!routeIdState && !postDetailState) {
    return <Navigate to="/" replace />;
  }
  const routeId = location.state?.routeId;
  const { createPost } = useSavePost(routeId);
  const { updatePost } = useUpdatePost();

  const editPost = location.state?.postDetail || { title: '', content: '' };
  const [title, setTitle] = useState(editPost.title);
  const [content, setContent] = useState(editPost.content);


  // 수정 모드 체크
  const isEditing = Boolean(location.state?.postDetail);

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
      if (isEditing) {
        await updatePost(editPost.id, title, content);
        ToastAlert('게시글이 수정되었습니다.', 'success');
      } else {
        await createPost(title, content);
        ToastAlert('게시글이 등록되었습니다.', 'success');
      }
      navigate('/board');
    } catch (error) {
      ToastAlert('게시글 작성을 실패했습니다.', 'error');
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-[840px] flex-col justify-center items-center">
      <nav className="navBar flex items-center justify-between">
        <button onClick={handleGoBack}>
          <GoArrowLeft className="text-xl" />
        </button>
        <div className="flex space-x-2">
          <Button
            onClick={handleSavePost}
            size="medium"
            className="bg-prime text-white border-none"
          >
            저장
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
