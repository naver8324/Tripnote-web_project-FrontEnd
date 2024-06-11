import React from 'react';
import mockImg from '../../assets/profile.png';
import { formmateDate } from '../../utils/date';
import PostInteraction from './PostInteraction';
import Button from '../commons/Button';
import useDeletePost from '../../Hooks/posts/useDeletePost';
import { ToastAlert } from '../commons/ToastAlert';
import { useNavigate } from 'react-router-dom';

export default function PostDetail({ postDetail }) {
  const {
    id,
    title,
    nickname,
    createdAt,
    content,
    hashtagResponseDTOList,
    likes,
    likedAt,
    markedAt,
    reportedAt,
  } = postDetail;
  const userNickname = localStorage.getItem('userNickname');
  const navigate = useNavigate();

  const deletePost = useDeletePost();
  // 게시글 삭제 함수
  const handleDeletePost = async () => {
    try {
      await deletePost(id);
      ToastAlert('게시글이 삭제되었습니다.', 'success');
      navigate('/board');
    } catch (error) {
      ToastAlert('게시글 삭제 실패', 'error');
    }
  };

  const handleEditPost = () => {
    navigate(`/editBoard`, { state: { postDetail } });
  };
  console.log('id', id);
  return (
    <div className="w-[900px] center pb-10 max-lg:px-[5vw]">
      <div className="mt-12">
        <div className="">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <div className="flex gap-2 items-center justify-between mt-4">
            <div className="flex space-x-2 items-center  text-title">
              <img src={mockImg} alt="" className="w-6 h-6 rounded-full" />
              <p className="text-lg opacity-70">
                {`${nickname} · ${formmateDate(createdAt)}`}
              </p>
            </div>
            {nickname === userNickname && (
              <div className="space-x-2 text-medium">
                <Button className=" text-title" onClick={handleEditPost}>
                  수정
                </Button>
                <Button className="text-red-400" onClick={handleDeletePost}>
                  삭제
                </Button>
              </div>
            )}
          </div>
          <hr className="border-b border-prime inline-block w-full" />
        </div>
        <div className="m-3 leading-7">
          <p
            className="text-xl"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div className="flex space-x-3 mt-7">
            {hashtagResponseDTOList?.map((hashtag) => (
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
