import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;

const createPost = async (newPost) => {
  const response = await axios.post(`${URL}/api/posts`, newPost, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export default createPost;
