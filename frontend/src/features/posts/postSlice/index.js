import { combineReducers } from '@reduxjs/toolkit';
import fetchPosts from './fetchPosts';
import findTitle from './findTitle';
import createPost from './createPost';
import deletePost from './deletePost';
import updatePost from './updatePost';
import fetchFeaturedPost from './fetchFeaturedPost';
import fetchSlug from './fetchSlug';

const postReducer = combineReducers({
  fetchPosts,
  findTitle,
  createPost,
  deletePost,
  updatePost,
  fetchFeaturedPost,
  fetchSlug,
});

export default postReducer;