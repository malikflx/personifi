import React, { useState, useEffect } from 'react';
import standardRequest from '../../utils/standardRequest';
import {
  Alert,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  Divider,
} from '@mui/material';

interface Post {
  id: number;
  content: string;
  platform: string;
  post_url: string;
  likes_count: number;
  comments_count: number;
  shares_count: number;
}

interface StandardError {
  status?: number;
  message?: string;
  originalError?: unknown;
}
const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await standardRequest.get('/posts');
        setPosts(response.data);
      } catch (err: unknown) {
        const error = err as StandardError;
        setError(error.message || 'An error occurred while fetching posts.');
      }
    };
    getPosts();
  }, []);

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {posts.length > 0 ? (
        <Stack spacing={2}>
          {posts.map((post) => (
            <Card key={post.id} variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  {post.platform}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {post.content}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2" color="textSecondary">
                  Likes: {post.likes_count} &nbsp;|&nbsp; Comments:{' '}
                  {post.comments_count} &nbsp;|&nbsp; Shares:{' '}
                  {post.shares_count}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        <Typography variant="body1" color="textSecondary">
          {'No posts found.'}
        </Typography>
      )}
    </Box>
  );
};

export default Posts;
