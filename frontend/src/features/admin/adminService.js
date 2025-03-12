import axios from 'axios';

export const fetchMessages = async ({ limit }) => {
  const response = await axios.get(`/api/admin/messages?limit=${limit}`);
  return response.data;
};