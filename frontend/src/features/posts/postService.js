import axios from 'axios';

const fetchPosts = async (limit, excludeFeatured = false) => {
  const response = await axios.get('/api/posts/recent', {
    params: { limit, excludeFeatured },
  });
  return response.data;
};

const fetchFeaturedPost = async () => {
  const response = await axios.get('/api/posts/featured');
  return response.data;
};

const deletePost = async (postId) => {
  const response = await axios.delete(`/api/posts/${postId}`);
  return response.data;   
};

const updatePost = async (postId, updatedPost) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedPost),
  })

  if (!response.ok) {
    const errorDetails = await response.text()
    console.error('Failed to update post. Server response:', response.status, errorDetails)
    throw new Error('Failed to update post')
  }

  const result = await response.json()
  return result
}


const postService = {
  fetchPosts,
  fetchFeaturedPost,
  deletePost,
  updatePost,
};

export default postService;
