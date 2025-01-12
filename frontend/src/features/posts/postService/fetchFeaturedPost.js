import axios from 'axios';

const fetchFeaturedPost = async () => {
  const response = await axios.get('/api/posts/featured');
  return response.data;
};

export default fetchFeaturedPost;
