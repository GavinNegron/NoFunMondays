import axios from 'axios';

export const fetchShop = async () => {
  const response = await axios.get(`/api/fortniteAPI/item-shop`);
  return response.data.data.entries;
};
