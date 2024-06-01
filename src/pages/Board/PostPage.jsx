import React from 'react';
import PostDetail from '../../components/Board/PostDetail';
import Comments from '../../components/Board/Comments';

export default function PostPage() {
  return (
    <section className="mt-40 mb-10">
      <PostDetail />
      <Comments />
    </section>
  );
}
