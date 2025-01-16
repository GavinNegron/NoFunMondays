import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;

const findTitle = async (title) => {
  const response = await axios.get(`${URL}/api/posts/title`, {
    params: { title },
  });
  return response.data.available;
};

export default findTitle;
