import React, { useEffect, useState } from 'react';
import Pagination from '../commons/Pagination';
import NoData from '../../pages/Board/NoData';
import Spinner from '../commons/Spinner';
import Button from '../commons/Button';
import { formmateDate } from '../../utils/date';
import useComments from '../../Hooks/admin/useComments';
import useDeletingComment from '../../Hooks/admin/useDeletingComment';
import {ToastAlert} from "../commons/ToastAlert.jsx";

const CommentManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [commentId, setCommentId] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [typedNickname, setTypedNickname] = useState('');
  const { initialComments, refetch: refetchComments } = useComments(
    commentId,
    nickname,
    currentPage,
    10,
  );
  const { DeletingComment } = useDeletingComment();

  const [comments, setComments] = useState(null);

  useEffect(() => {
    if (initialComments && initialComments.content) {
      setComments(initialComments.content);
    }
  }, [initialComments]);

  useEffect(() => {
    refetchComments();
  }, [commentId, nickname]);

    const handleDeletingComment = async (comment) => {

        try {
            await DeletingComment(comment);
            refetchComments();
            const deleteComment = comments.find((fetchComment) => fetchComment.id === comment.id).deleted;
            if(!deleteComment){
                ToastAlert(`${comment.id}번 댓글이 삭제되었습니다.`, 'success');
                return;
            }
            ToastAlert(`${comment.id}번 댓글이 복구되었습니다.`, 'success');
        } catch (error) {
            console.error('delete post failed:', error);
        }
    }
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCommentId(null);
    setNickname(typedNickname);
    setTypedNickname('');
  };

  return (
  <>
    <div className="flex justify-between">
      <form onSubmit={handleSubmit}>
        <input
          className="w-[250px] h-[40px] p-2 border border-gray-300 rounded-lg"
          type="text"
          placeholder="유저 닉네임을 입력하세요"
          value={typedNickname}
          onChange={(e) => {
            setTypedNickname(e.target.value);
          }}
        />
      </form>
      <Button
        variant={'nomalButton'}
        size={'large'}
        onClick={() => {
          setCommentId(null);
          setNickname(null);
          setTypedNickname('');
        }}
      >
        전체 보기
      </Button>
    </div>
      <div className=" flex flex-col">
        <div className="text-xl font-bold flex flex-wrap border-b border-grey p-2 mt-4 ">
          <div className="flex-[0.2] text-center">Num</div>
          <div className="flex-[0.5] text-center">작성자</div>
          <div className="flex-[1.2] text-center">내용</div>
          <div className="flex-[0.8] text-center">생성일</div>
          <div className="flex-1 text-center">삭제 여부</div>
        </div>

        {comments === null ? (
          <Spinner />
        ) : comments.length ? (
            comments.map((comment) => (
            <div key={comment.id} className="flex flex-wrap items-center justify-around border-b border-grey p-2">
              <div className="flex-[0.2] text-center">{comment.id}</div>
              <div className="flex-[0.5] text-center cursor-pointer"
                onClick={() => {
                  setTypedNickname(comment.nickname);
                  setNickname(null);
                    setCommentId(comment.id);
                }}>{comment.nickname}</div>
              <div className="flex-[1.2] text-center">{comment.content}</div>
              <div className="flex-[0.8] text-center">{formmateDate(comment.createdAt)}</div>
              <div className="flex-1 text-center flex justify-between items-center">
                <div className="flex-1 text-center">{comment.deleted ? 'Yes' : 'No'}</div>
                <Button
                  variant={'nomalButton'}
                  size={'medium'}
                  onClick={() => handleDeletingComment(comment)}
                >{!comment.deleted ? '삭제' : '복원'}
                </Button>
              </div>
            </div>
          ))
      ) : (
          <NoData message="댓글이 없습니다." />
      )}
      <div className="mt-10"></div>
      <Pagination
        currentPage={currentPage}
        totalPage={Math.ceil(
          initialComments
            ? initialComments.totalElements / initialComments.pageable.pageSize
            : 5,
        )}
        onPageChange={handlePageChange}
      />
    </div>
  </>
  );
};

export default CommentManagement;
