import React, { useEffect, useState } from 'react';
import usePosts from '../../Hooks/admin/usePosts';
import Pagination from '../commons/Pagination';
import NoData from '../../pages/Board/NoData';
import Spinner from '../commons/Spinner';
import Button from '../commons/Button';
import InfoInput from '../commons/InfoInput';
import { formmateDate } from '../../utils/date';
import { Link } from 'react-router-dom';
import useDeletingPost from '../../Hooks/admin/useDeletingPost';

const PostManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postId, setPostId] = useState(null);
  const [deletedPostId, setDeletedPostId] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [typedNickname, setTypedNickname] = useState('');
  const { initialPosts, refetch: refetechPosts } = usePosts(
    postId,
    nickname,
    currentPage,
    10,
  );

  const { refetch: refetchDeletePost } = useDeletingPost(deletedPostId);

  const [posts, setPosts] = useState(null);

  useEffect(() => {
    if (initialPosts && initialPosts.content) {
      setPosts(initialPosts.content);
    }
  }, [initialPosts]);

  useEffect(() => {
    refetechPosts();
  }, [postId, nickname]);

  useEffect(() => {
    if (deletedPostId !== null) {
      refetchDeletePost();

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === deletedPostId
            ? {
                ...post,
                deleted: !post.deleted,
              }
            : post,
        ),
      );
      setDeletedPostId(null);
    }
  }, [deletedPostId]);

  const renderPosts = () => {
    return posts.map((post) => (
      <tr>
        <th>{post.id}</th>
        <th
          className="cursor-pointer"
          onClick={() => {
            setNickname(null);
            setPostId(post.id);
          }}
        >
          {post.nickname}
        </th>
        <th>{post.title}</th>
        <th>{formmateDate(post.createdAt)}</th>
        <th>{post.deleted ? 'Yes' : 'No'}</th>
        <th>
          <Button
            variant={'nomalButton'}
            size={'medium'}
            onClick={() => {
              setDeletedPostId(post.id);
            }}
          >
            {!post.deleted ? '삭제' : '복원'}
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
        게시글 관리 (member ={' '}
        {postId !== null
          ? posts.find((post) => post.id === postId)?.nickname || ''
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
          setPostId(null);
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
            <th>게시글 id</th>
            <th>작성자</th>
            <th>제목</th>
            <th>생성일</th>
            <th>삭제 여부</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {posts === null ? (
            <Spinner />
          ) : posts.length > 0 ? (
            renderPosts()
          ) : (
            <NoData message="게시글이 없습니다." />
          )}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPage={Math.ceil(
          initialPosts
            ? initialPosts.totalElements / initialPosts.pageable.pageSize
            : 5,
        )}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PostManagement;
