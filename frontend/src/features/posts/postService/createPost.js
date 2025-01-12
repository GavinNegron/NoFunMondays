import axios from 'axios';

const createPost = async (newPost) => {
  const response = await axios.post('/api/posts', newPost, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export default createPost;
