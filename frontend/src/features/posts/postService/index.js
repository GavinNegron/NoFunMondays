import fetchPosts from './fetchPosts';
import fetchFeaturedPost from './fetchFeaturedPost';
import deletePost from './deletePost';
import updatePost from './updatePost';
import createPost from './createPost';
import findTitle from './findTitle';

const postService = {
  fetchPosts,
  fetchFeaturedPost,
  deletePost,
  updatePost,
  createPost,
  findTitle,
};

export default postService;