import axios from "axios";

const fetchPosts = async (limit, excludeFeatured = false) => {
    const response = await axios.get('/api/posts/recent', {
      params: { limit, excludeFeatured },
    });
    return response.data;
};

export default fetchPosts;