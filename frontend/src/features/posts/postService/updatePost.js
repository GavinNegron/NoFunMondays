import axios from 'axios';



const updatePost = async (postId, updatedPost) => {
  console.log(postId)
  console.log(updatedPost)
  const response = await axios.put(`/api/posts/${postId}`, updatedPost, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export default updatePost;
