import { createAsyncThunk } from '@reduxjs/toolkit';
import * as postService from './postService';

export const addPostElement = (newElement) => {
  return {
    type: 'posts/addPostElement',
    payload: newElement,
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

export const fetchFeaturedPost = createAsyncThunk('posts/fetchFeaturedPost', async (_, thunkAPI) => {
  try {
    const response = await postService.fetchFeaturedPost();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch posts');
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