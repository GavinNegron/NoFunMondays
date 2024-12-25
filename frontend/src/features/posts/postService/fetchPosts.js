import axios from "axios";
import { fetchPost } from "../../../utilities/posts/postData/fetchPost";

const fetchPosts = async (limit, excludeFeatured = false) => {
    const response = await axios.get('/api/posts/recent', {
      params: { limit, excludeFeatured },
    });
    return response.data;
};

export default fetchPost;