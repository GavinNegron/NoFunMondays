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

const postService = {
  fetchPosts,
  fetchFeaturedPost,
};

export default postService;
