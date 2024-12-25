import axios from "axios";

const deletePost = async (postId) => {
    const response = await axios.delete(`/api/posts/${postId}`);
    return response.data;   
};

export default deletePost