import { createAsyncThunk } from '@reduxjs/toolkit';
import * as postService from './postService';

export const addPostElement = (newElement, insertIndex) => {
  return {
    type: 'posts/addPostElement',
    payload: { newElement, insertIndex },
  };
};

export const deletePostElement = (elementId) => {
  return {
    type: 'posts/deletePostElement',
    payload: elementId,
  };
};

export const createPost = createAsyncThunk('posts/create', async (newPost, thunkAPI) => {
  try {
    const response = await postService.createPost(newPost);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to create post');
  }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (postId, thunkAPI) => {
  try {
    const response = await postService.deletePost(postId);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete post');
  }
});


export const fetchRecentPosts = createAsyncThunk('posts/fetchRecentPosts', async ({ type = 'all' }, thunkAPI) => {
  try {
    const response = await postService.fetchRecentPosts(type);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch recent posts');
  }
});


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ({ limit, excludeFeatured }, thunkAPI) => {
  try {
    const response = await postService.fetchPosts(limit, excludeFeatured);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch posts');
  }
});

export const fetchSlug = createAsyncThunk('posts/fetchSlug', async (slug, thunkAPI) => {
  try {
    const response = await postService.fetchSlug(slug);
    return response; 
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch post');
  }
});

export const fetchTitle = createAsyncThunk('posts/fetchTitle', async (title, thunkAPI) => {
  try {
    const response = await postService.fetchTitle(title);
    return response; 
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch title.');
  }
});

export const publishPost = createAsyncThunk('posts/publishPost', async ({ post, postElements }, thunkAPI) => {
  try {
    return await postService.publishPost(post, postElements);
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to publish post.');
  }
});

// ANALYTICS

export const fetchPostViews = createAsyncThunk('posts/fetchPostViews', async ({ slug, days }, thunkAPI) => {
  try {
    return await postService.fetchPostViews(slug ? slug : undefined, days);
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to get post views.');
  }
});
