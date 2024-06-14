import React, { useEffect, useState } from 'react';
import Button from '../commons/Button';
import { ToastAlert } from '../commons/ToastAlert';
import useCommentPost from '../../Hooks/posts/useCommentPost';
import useGetComment from '../../Hooks/posts/useGetComment';
import NoData from '../../pages/Board/NoData';
import { formmateDate } from '../../utils/date';
import useDeleteComment from '../../Hooks/posts/useDeleteComment';
import useUpdateComment from '../../Hooks/posts/useUpdateComment';
import useDebounce from '../../Hooks/useDebounce';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function Comments({ postDetail }) {
  const { id } = postDetail;
  const userNickname = localStorage.getItem('userNickname');
  const [comment, setComment] = useState('');
  const { leaveComment, responseData, loading, error } = useCommentPost(id);
  const { comments, refetch } = useGetComment(id);
  const [displayCount, setDisplayCount] = useState(4);

  const handleComment = async () => {
    if (!comment.length) {
      ToastAlert('내용을 입력해주세요.', 'error');
      return;
    }
    await leaveComment(comment);
    setComment('');
    ToastAlert('댓글이 등록되었습니다.', 'success');
    refetch();
  };

  const debounceHandleSave = useDebounce(handleComment, 500);

  const deleteComment = useDeleteComment();

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      ToastAlert('댓글이 삭제되었습니다.', 'success');
      refetch();
    } catch (error) {
      ToastAlert('댓글 삭제 실패', 'error');
    }
  };

  const [updateComment, setUpdateComment] = useState({ id: null, content: '' });
  const { saveComment } = useUpdateComment();

  const handleUpdateComment = (commentData) => {
    setUpdateComment({
      id: commentData.id,
      content: commentData.content,
    });
  };

  const handleSaveUpdateComment = async () => {
    try {
      await saveComment(updateComment.id, updateComment.content);
      ToastAlert('댓글이 수정되었습니다.', 'success');
      setUpdateComment({ id: null, content: '' });
      refetch();
    } catch (error) {
      ToastAlert('댓글 수정 실패', 'error');
    }
  };

  const handleKeyDown = (e, saveFunction) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.metaKey) {
      e.preventDefault();
      saveFunction();
    }
  };

  const handleShowMore = () => {
    setDisplayCount((prevCount) => prevCount + 4);
  };

  return (
    <>
      <div className="text-title relative pr-[80px]">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, debounceHandleSave)}
          placeholder="댓글을 남겨주세요."
          className="pl-5 pt-5 placeholder:opacity-80 resize-none outline-none w-full h-[60px] overflow-auto bg-gray-100 rounded-md pr-[80px]"
        ></textarea>
        <Button
          onClick={debounceHandleSave}
          size="medium"
          className="bg-red-400 text-white absolute right-1 top-1/2 transform -translate-y-1/2 px-4"
        >
          등록
        </Button>
      </div>
      <div>
        {comments && comments.content && comments.content.length > 0 ? (
          <>
            <TransitionGroup>
              {comments.content.slice(0, displayCount).map((commentData) => (
                <CSSTransition
                  key={commentData.id}
                  timeout={300}
                  classNames={{
                    enter: 'opacity-0',
                    enterActive: 'animate-fadeIn',
                    exit: 'opacity-100',
                    exitActive: 'animate-fadeOut',
                  }}
                >
                  <div
                    key={commentData.id}
                    className="my-4 p-4 text-sm rounded-md border border-gray-300"
                  >
                    <div className="flex justify-between">
                      <div className="flex gap-3 mb-4 text-title">
                        <p className="line-clamp-1">{commentData.nickname}</p>
                        <p className="opacity-70">
                          {formmateDate(commentData.createdAt)}
                        </p>
                      </div>
                      {userNickname === commentData.nickname && (
                        <div className="space-x-2">
                          <Button
                            size="small"
                            className="hover:bg-red-400 hover:text-white"
                            onClick={() => {
                              if (updateComment.id === commentData.id) {
                                handleSaveUpdateComment();
                              } else {
                                handleUpdateComment(commentData);
                              }
                            }}
                          >
                            {updateComment.id === commentData.id ? '저장' : '수정'}
                          </Button>
                          <Button
                            size="small"
                            className="hover:bg-red-400 hover:text-white"
                            onClick={() => handleDeleteComment(commentData.id)}
                          >
                            삭제
                          </Button>
                        </div>
                      )}
                    </div>
                    {updateComment.id === commentData.id ? (
                      <textarea
                        value={updateComment.content}
                        onChange={(e) =>
                          setUpdateComment({
                            ...updateComment,
                            content: e.target.value,
                          })
                        }
                        onKeyDown={(e) => handleKeyDown(e, handleSaveUpdateComment)}
                        className="resize-none outline-none w-full h-[60px] overflow-auto bg-gray-100 rounded-md pr-[80px]"
                      ></textarea>
                    ) : (
                      <p>{commentData.content}</p>
                    )}
                  </div>
                </CSSTransition>
              ))}
            </TransitionGroup>
            {displayCount < comments.content.length && (
              <div className="text-center mt-4">
                <Button
                  onClick={handleShowMore}
                  size="small"
                  className="hover:bg-gray-300 text-title px-4"
                >
                  더보기
                </Button>
              </div>
            )}
          </>
        ) : (
          <NoData message="댓글이 없습니다." />
        )}
      </div>
    </>
  );
}