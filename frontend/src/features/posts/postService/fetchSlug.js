import axios from 'axios';

const fetchSlug = async (slug) => {
  const response = await axios.get(`/api/posts/slug/${slug}`);
  return response.data;
};


export default fetchSlug;