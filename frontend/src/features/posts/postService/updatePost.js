import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;

const updatePost = async (postId, updatedPost) => {
  const response = await axios.put(`${URL}/api/posts/${postId}`, updatedPost, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export default updatePost;
