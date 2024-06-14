import React, { useEffect, useState } from 'react';
import PostCard from '../../components/Board/PostCard';
import Spinner from '../../components/commons/Spinner';
import NoData from '../Board/NoData';
import Pagination from '../../components/commons/Pagination';
import useGetMyReview from '../../Hooks/mypage/useGetMyReview';

export default function MyPageContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const { reviews, error, loading, refetch } = useGetMyReview(
    currentPage,
    4,
  );

  const [localPosts, setLocalPosts] = useState([]);

  useEffect(() => {
    if (reviews && reviews.content) {
      setLocalPosts(reviews.content);
    }
  }, [reviews]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <section className="flex flex-col text-title w-full mt-5">
      <div className="flex flex-1 w-full mb-16">
        <div className="flex-1 pr-4 space-y-8">
          {reviews === null ? (
            <Spinner />
          ) : localPosts.length ? (
            localPosts.map((localPost, index) => (
              <PostCard key={`${localPost.id}-${index}`} contents={localPost} />
            ))
          ) : (
            <NoData message="작성한 후기 게시물이 없습니다." />
          )}
          {localPosts !== null && localPosts.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPage={Math.ceil(
                reviews ? reviews.totalElements / reviews.size : 0,
              )}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </section>
  );
}
