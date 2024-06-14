import React, { useEffect, useState } from 'react';
import usePosts from '../../Hooks/admin/usePosts';
import Pagination from '../commons/Pagination';
import NoData from '../../pages/Board/NoData';
import Spinner from '../commons/Spinner';
import Button from '../commons/Button';
import { formmateDate } from '../../utils/date';
import useDeletingPost from '../../Hooks/admin/useDeletingPost';
import {ToastAlert} from "../commons/ToastAlert.jsx";

const PostManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postId, setPostId] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [typedNickname, setTypedNickname] = useState('');
  const { initialPosts, refetch: refetechPosts } = usePosts(
    postId,
    nickname,
    currentPage,
    10,
  );

  const { DeletingPost } = useDeletingPost();

  const [posts, setPosts] = useState(null);

  useEffect(() => {
    if (initialPosts && initialPosts.content) {
      setPosts(initialPosts.content);
    }
  }, [initialPosts]);

  useEffect(() => {
    refetechPosts();
  }, [postId, nickname]);


  const handleDeletingPost = async (post) => {

    try {
      await DeletingPost(post);
      refetechPosts();
      const deletePost = posts.find((fetchPost) => fetchPost.id === post.id).deleted;
      if(!deletePost){
        ToastAlert(`${post.id}번 게시글이 삭제되었습니다.`, 'success');
        return;
      }
      ToastAlert(`${post.id}번 게시글이 복구되었습니다.`, 'success');
    } catch (error) {
      console.error('delete post failed:', error);
    }
  }

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPostId(null);
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
          setPostId(null);
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
          <div className="flex-[1.2] text-center">제목</div>
          <div className="flex-[0.8] text-center">생성일</div>
          <div className="flex-1 text-center">삭제 여부</div>
        </div>

        {posts === null ? (
            <Spinner />
        ) : posts.length ? (
          posts.map((post) => (
            <div key={post.id} className="flex flex-wrap items-center justify-around border-b border-grey p-2">
              <div className="flex-[0.2] text-center">{post.id}</div>
              <div className="flex-[0.5] text-center cursor-pointer"
                onClick={() => {
                setTypedNickname(post.nickname);
                setNickname(null);
                setPostId(post.id);
              }}>{post.nickname}</div>
              <div className="flex-[1.2] text-center">{post.title}</div>
              <div className="flex-[0.8] text-center">{formmateDate(post.createdAt)}</div>
              <div className="flex-1 text-center flex justify-between items-center">
                <div className="flex-1 text-center">{post.deleted ? 'Yes' : 'No'}</div>
                <Button
                  variant={'nomalButton'}
                  size={'medium'}
                  onClick={() => handleDeletingPost(post)}
                >{!post.deleted ? '삭제' : '복원'}
                </Button>
              </div>
            </div>
            ))
        ) : (
            <NoData message="게시글이 없습니다." />
        )}
      <div className="mt-10"></div>
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
  </>
  );
};

export default PostManagement;