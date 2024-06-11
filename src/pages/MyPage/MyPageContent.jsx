import React, { useEffect, useState } from 'react';
import PostCard from '../../components/Board/PostCard';
import Spinner from '../../components/commons/Spinner';
import NoData from '../Board/NoData';
import Pagination from '../../components/commons/Pagination';
import useMemberPosts from '../../Hooks/posts/useMemberPosts';

export default function MyPageContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const { posts, error, loading, refetch } = useMemberPosts(
    '최신순',
    currentPage,
    4,
  );
  const [localPosts, setLocalPosts] = useState(null);

  useEffect(() => {
    if (posts && posts.content) {
      setLocalPosts(posts.content);
      console.log('localPosts:', posts.content);
    }
  }, [posts]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <section className="flex flex-col text-title w-full mt-5">
      <div className="flex flex-1 w-full mb-16">
        <div className="flex-1 pr-4 space-y-8">
          {localPosts === null ? (
            <Spinner />
          ) : localPosts.length ? (
            localPosts.map((localPost, index) => (
              <PostCard key={`${localPost.id}-${index}`} contents={localPost} />
            ))
          ) : (
            <NoData message="후기 게시물이 없습니다." />
          )}
          {localPosts !== null && localPosts.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPage={Math.ceil(
                posts ? posts.totalElements / posts.pageable.pageSize : 0,
              )}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </section>
  );
}
