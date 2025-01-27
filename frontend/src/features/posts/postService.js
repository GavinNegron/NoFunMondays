import axios from 'axios';

export const createPost = async (newPost) => {
  const response = await axios.post(`/api/posts`, newPost, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const deletePost = async (postId) => {
  const response = await axios.delete(`/api/posts/${postId}`);
  return response.data;
};

export const fetchFeaturedPost = async () => {
  try {
    const response = await axios.get(`/api/posts/featured`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Featured post not found');
    }
    throw new Error(error.response?.data?.message || 'Failed to fetch featured post');
  }
};

export const fetchPosts = async (limit, excludeFeatured = false) => {
  const response = await axios.get(`/api/posts/recent`, {
    params: { limit, excludeFeatured },
  });
  return response.data;
};

export const fetchSlug = async (slug) => {
  const response = await axios.get(`/api/posts/slug/${slug}`);
  return response.data;
};

export const fetchTitle = async (title) => {
  const response = await axios.get(`/api/posts/title`, {
    params: { title },
  });
  return response.data.available;
};

export const updatePost = async (postId, updatedPost) => {
  const response = await axios.put(`/api/posts/${postId}`, updatedPost, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};