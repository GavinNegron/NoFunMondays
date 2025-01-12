import axios from 'axios';

const fetchTasks = async (limit, excludeFeatured = false) => {
  const response = await axios.get('/api/tasks', {
    params: { limit, excludeFeatured },
  });
  return response.data;
};

export default fetchTasks;