import React, { useEffect, useState } from 'react';
import Button from '../commons/Button';
import { ToastAlert } from '../commons/ToastAlert';
import useCommentPost from '../../Hooks/posts/useCommentPost';
import useGetComment from '../../Hooks/posts/useGetComment';
import NoData from '../../pages/Board/NoData';
import { formmateDate } from '../../utils/date';
import useUserStore from '../../store/useUserStore';
import useDeleteComment from '../../Hooks/posts/useDeleteComment';
import useUpdateComment from '../../Hooks/posts/useUpdateComment';

export default function Comments({ postDetail }) {
  const { id } = postDetail;
  const userNickname = localStorage.getItem('userNickname');
  const [comment, setComment] = useState('');
  const { leaveComment, responseData, loading, error } = useCommentPost(id);
  const {
    comments,
    // error: commentErr,
    // loading: commentLoading,
    refetch,
  } = useGetComment(id);

  // 댓글 등록 함수
  const handleComment = async () => {
    if (!comment.length) {
      ToastAlert('내용을 입력해주세요.', 'error');
      return;
    }
    await leaveComment(comment);
    setComment(''); // 댓글 초기화
    ToastAlert('댓글이 등록되었습니다.', 'success');
    refetch(); // 댓글 목록 불러오기
  };

  const deleteComment = useDeleteComment();
  // 댓글 삭제 함수
  const handleDeleteComment = async (commentId) => {
    try {
      console.log('commentId', commentId);
      await deleteComment(commentId); // 삭제할 댓글의 ID를 전달하여 호출
      ToastAlert('댓글이 삭제되었습니다.', 'success');
      refetch(); // 삭제 후 댓글 목록 다시 불러오기
    } catch (error) {
      ToastAlert('댓글 삭제 실패', 'error');
    }
  };

  const [updateComment, setUpdateComment] = useState({ id: null, content: '' });
  const { saveComment } = useUpdateComment();

  // 댓글 수정 상태 업데이트 함수
  const handleUpdateComment = (commentData) => {
    console.log(updateComment);
    setUpdateComment({
      id: commentData.id,
      content: commentData.content,
    });
  };
  // 댓글 수정 서버 업데이트 함수
  const handleSaveUpdateComment = async () => {
    try {
      await saveComment(updateComment.id ,updateComment.content);
      ToastAlert('댓글이 수정되었습니다.', 'success');
      setUpdateComment({ id: null, content: '' }); // 수정 상태 초기화
      refetch(); // 수정 후 댓글 목록 다시 불러오기

    } catch (error) {
      ToastAlert('댓글 수정 실패', 'error');
    }
  };

  return (
    <>
      <div className="text-title relative pr-[80px]">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); // Enter키 누르면 줄바꿈 방지 **Mac OS 체크필요
              handleComment(e);
            }
          }}
          placeholder="댓글을 남겨주세요."
          className="pl-5 pt-5 placeholder:opacity-80 resize-none outline-none w-full h-[60px] overflow-auto bg-gray-100 rounded-md pr-[80px]"
        ></textarea>
        <Button
          onClick={handleComment}
          size="medium"
          className="bg-red-400 text-white absolute right-1 top-1/2 transform -translate-y-1/2 px-4"
        >
          등록
        </Button>
      </div>
      <div>
        {comments && comments.content && comments.content.length > 0 ? (
          comments.content.map((commentData) => (
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
                          handleSaveUpdateComment(); // 저장 함수 호출
                        } else {
                          handleUpdateComment(commentData); // 수정 함수 호출
                        }
                      }}
                    >
                      {updateComment.id === commentData.id
                        ? '저장'
                        : '수정'}
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
                  className="resize-none outline-none w-full h-[60px] overflow-auto bg-gray-100 rounded-md pr-[80px]"
                ></textarea>
              ) : (
                <p>{commentData.content}</p>
              )}
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
