import React, { useEffect, useState } from 'react';
import Pagination from '../commons/Pagination';
import NoData from '../../pages/Board/NoData';
import Spinner from '../commons/Spinner';
import Button from '../commons/Button';
import InfoInput from '../commons/InfoInput';
import { formmateDate } from '../../utils/date';
import useComments from '../../Hooks/admin/useComments';
import useDeletingComment from '../../Hooks/admin/useDeletingComment';

const CommentManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [commentId, setCommentId] = useState(null);
  const [deletedCommentId, setDeletedCommentId] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [typedNickname, setTypedNickname] = useState('');
  const { initialComments, refetch: refetchComments } = useComments(
    commentId,
    nickname,
    currentPage,
    10,
  );
  const { refetch: refetechDeleteComment } =
    useDeletingComment(deletedCommentId);

  const [comments, setComments] = useState(null);

  useEffect(() => {
    if (initialComments && initialComments.content) {
      setComments(initialComments.content);
    }
  }, [initialComments]);

  useEffect(() => {
    refetchComments();
  }, [commentId, nickname]);

  useEffect(() => {
    if (deletedCommentId !== null) {
      refetechDeleteComment();
      setDeletedCommentId(null);
    }
  }, [deletedCommentId]);

  const renderComments = () => {
    return comments.map((comment) => (
      <tr>
        <th>{comment.id}</th>
        <th
          className="cursor-pointer"
          onClick={() => {
            setNickname(null);
            setCommentId(comment.id);
          }}
        >
          {comment.nickname}
        </th>
        <th>{comment.content}</th>
        <th>{formmateDate(comment.createdAt)}</th>
        <th>{comment.delete ? 'Yes' : 'No'}</th>
        <th>
          <Button
            variant={'nomalButton'}
            size={'medium'}
            onClick={() => {
              setDeletedCommentId(comment.id);
            }}
          >
            {!comment.delete ? '삭제' : '복원'}
          </Button>
        </th>
      </tr>
    ));
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mt-10 mb-10">
        댓글 관리 (member ={' '}
        {commentId !== null
          ? comments.find((comment) => comment.id === commentId)?.nickname || ''
          : nickname !== null
            ? nickname
            : '전체'}
        )
      </h2>
      <Button
        className="mb-10"
        variant={'nomalButton'}
        size={'large'}
        onClick={() => {
          setCommentId(null);
          setNickname(null);
        }}
      >
        전체 보기
      </Button>
      <form
        className={'w-1/3 mb-10'}
        onSubmit={(e) => {
          e.preventDefault();
          setNickname(typedNickname);
          setTypedNickname('');
        }}
      >
        {' '}
        <InfoInput
          title="유저 닉네임"
          type="text"
          value={typedNickname}
          onChange={(e) => {
            setTypedNickname(e.target.value);
          }}
        />
      </form>

      <table className="mb-10" style={{ width: '100%' }}>
        <thead style={{ width: '100%' }}>
          <tr>
            <th>댓글 id</th>
            <th>작성자</th>
            <th>내용</th>
            <th>생성일</th>
            <th>삭제 여부</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {comments === null ? (
            <Spinner />
          ) : comments.length > 0 ? (
            renderComments()
          ) : (
            <NoData message="게시글이 없습니다." />
          )}
        </tbody>
      </table>
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
  );
};

export default CommentManagement;
