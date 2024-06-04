import React from 'react';
import useMemberPosts from '../../Hooks/posts/useMemberPosts';

const MyReview = () => {
  const { posts, error, loading, refetch } = useMemberPosts(1, 6);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Member Posts</h1>
      <button onClick={refetch}>Refresh</button>
      {posts && posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default MyReview;
