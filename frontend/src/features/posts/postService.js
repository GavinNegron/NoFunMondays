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
  console.log(response);  // Log the response for debugging
  return response.data;   // Return the data to be used in the component
};

const updatePost = async (postId, updatedPost) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedPost),
  })

  if (!response.ok) throw new Error('Failed to update post')
  return await response.json()
}

const postService = {
  fetchPosts,
  fetchFeaturedPost,
  deletePost,
  updatePost,
};

export default postService;
