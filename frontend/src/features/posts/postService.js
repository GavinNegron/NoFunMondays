import axios from 'axios'; // Import axios for HTTP requests

// fetchPosts
const fetchPosts = async () => {
  // Send a GET request to the backend's recent posts endpoint with limit of 8 posts
  const response = await axios.get('/api/posts', {
    params: {
      limit: 8, // Pass the limit to the backend
    },
  });

  return response.data; // Return the list of posts
};

// fetchFeaturedPost
const fetchFeaturedPost = async () => {
  const response = await axios.get('/api/posts/featured');
  return response.data;
}

const postService = {
  fetchPosts, 
  fetchFeaturedPost,
}

export default postService;