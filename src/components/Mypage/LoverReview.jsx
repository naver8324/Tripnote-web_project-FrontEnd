import React, { useEffect, useState } from 'react';
import useGetMyMarkedReview from '../../Hooks/mypage/useGetMyMarkedReview';
import Spinner from '../commons/Spinner';
import PostCard from '../Board/PostCard';
import NoData from '../../pages/Board/NoData';
import Pagination from '../commons/Pagination';

const LoverReview = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { markedReviews, error, loading, refetch } = useGetMyMarkedReview(
    currentPage,
    4,
  );

  const [localPosts, setLocalPosts] = useState([]);

  useEffect(() => {
    if (markedReviews && markedReviews.content) {
      setLocalPosts(markedReviews.content);
    }
  }, [markedReviews]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <section className="w-[840px] flex flex-col text-title mt-5">
      <div className="flex flex-1 w-full mb-16">
        <div className="flex-1 pr-4 space-y-8">
          {markedReviews === null ? (
            <Spinner />
          ) : localPosts.length ? (
            localPosts.map((localPost, index) => (
              <PostCard key={`${localPost.id}-${index}`} contents={localPost} />
            ))
          ) : (
            <NoData message="북마크한 후기 게시물이 없습니다." />
          )}
          {localPosts !== null && localPosts.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPage={Math.ceil(
                markedReviews ? markedReviews.totalElements / markedReviews.size : 0,
              )}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default LoverReview;
