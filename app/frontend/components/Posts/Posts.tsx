import React, { useState, useEffect } from 'react';
import standardRequest from "../../utils/standardRequest";

interface Post {
  id: number,
  content: string,
  platform: string,
  post_url: string,
  likes_count: number,
  comments_count: number,
  shares_count: number
}
const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    standardRequest.get('/api/v1/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error("Error fetching posts", error);
        setError("Failed to load posts");
      })
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id}>
            <p><strong>Content: </strong>{post.content}</p>
            <p><strong>Platform: </strong>{post.platform}</p>
            <p>Likes: {post.likes_count} | Comments: {post.comments_count} | Shares: {post.shares_count}</p>
            <hr />
          </div>
        ))
      ):(
        <p>No posts found</p>
      )}
    </div>
  );
};

export default Posts;