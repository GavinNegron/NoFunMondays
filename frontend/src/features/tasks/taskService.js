import axios from 'axios';

export const fetchTasks = async (taskLimit) => {
  try {
    const response = await axios.get(`/api/tasks/`, {
      params: { taskLimit },
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Featured post not found');
    }
    throw new Error(error.response?.data?.message || 'Failed to fetch featured post');
  }
};

export const updateTaskStatus = async (taskId, taskStatus) => {
  try {
    const response = await axios.put(`/api/tasks/${taskId}`, { taskId, taskStatus }); 
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Failed to update task status');
    }
    throw new Error(error.response?.data?.message || 'Failed to update task status');
  }
};