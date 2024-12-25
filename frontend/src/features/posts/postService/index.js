import fetchPosts from './fetchPosts';
import fetchFeaturedPost from './fetchFeaturedPost';
import deletePost from './deletePost';
import updatePost from './updatePost';

const postService = {
  fetchPosts,
  fetchFeaturedPost,
  deletePost,
  updatePost,
};

export default postService;