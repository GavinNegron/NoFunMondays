import axios from 'axios';

const URL = process.env.REACT_APP_API_URL

const deletePost = async (postId) => {
  const response = await axios.delete(`/api/posts/${postId}`);
  return response.data;
};

export default deletePost;
