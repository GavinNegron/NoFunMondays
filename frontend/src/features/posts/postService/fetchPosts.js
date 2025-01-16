import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;

const fetchPosts = async (limit, excludeFeatured = false) => {
  const response = await axios.get(`${URL}/api/posts/recent`, {
    params: { limit, excludeFeatured },
  });
  return response.data;
};

export default fetchPosts;