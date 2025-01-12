import axios from 'axios';

const findTitle = async (title) => {
  const response = await axios.get('/api/posts/title', {
    params: { title },
  });
  return response.data.available;
};

export default findTitle;
