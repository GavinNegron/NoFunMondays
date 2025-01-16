import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;

const fetchFeaturedPost = async () => {
  try {
    const response = await axios.get(`${URL}/api/posts/featured`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Featured post not found');
    }
    throw new Error(error.response?.data?.message || 'Failed to fetch featured post');
  }
};

export default fetchFeaturedPost;
