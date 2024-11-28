import axios from 'axios';

const fetchPosts = async (limit) => {
  const response = await axios.get('/api/posts/recent', {
    params: { limit }, // Dynamically pass the limit
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


const postService = {
  fetchPosts,
  fetchFeaturedPost,
  deletePost,
};

export default postService;
