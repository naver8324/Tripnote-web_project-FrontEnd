import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostDetail from '../../components/Board/PostDetail';
import Comments from '../../components/Board/Comments';
import useDetailPost from '../../Hooks/posts/useDetailPost';
import Spinner from '../../components/commons/Spinner';
import { ToastAlert } from '../../components/commons/ToastAlert';

export default function PostPage() {
  const { postId } = useParams();
  const { detailPost, error, loading} = useDetailPost(postId);
  const [postDetail, setPostDetail] = useState(null);

  useEffect(() => {
    if (detailPost) {
      setPostDetail(detailPost);
    }
  }, [detailPost]);

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return ToastAlert(`${error.message}`, 'error');
  }
  if (!postDetail) {
    return <div>No data available</div>;
  }

  return (
    <section className="mt-40 mb-10">
      <PostDetail postDetail={postDetail} />
      <Comments postDetail={postDetail} />
    </section>
  );
}