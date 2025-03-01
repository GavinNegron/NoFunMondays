import { createAsyncThunk } from '@reduxjs/toolkit';
import * as postService from './postService';

export const updatePostElement = (elementId, updatedContent) => {
  return {
    type: 'posts/updatePostElement',
    payload: { elementId, updatedContent },
  };
};

export const addPostElement = (newElement, insertIndex) => {
  return {
    type: 'posts/addPostElement',
    payload: { newElement, insertIndex },
  };
};

export const updatePostDescription = (newDescription) => {
  return {
    type: 'posts/updatePostDescription',
    payload: { newDescription },
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

export const deletePost = createAsyncThunk('posts/deletePost', async (postIds, thunkAPI) => {
  try {
    const response = await postService.deletePost(postIds);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete post');
  }
});

export const fetchRecentPosts = createAsyncThunk('posts/fetchRecentPosts', async ({postLimit, type}, thunkAPI) => {
  try {
    const response = await postService.fetchRecentPosts(postLimit, type || 'recent');
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

export const publishPost = createAsyncThunk('posts/publishPost', async ({ post, postElements, isFeatured, isChallenge }, thunkAPI) => {
  try {
    return await postService.publishPost(post, postElements, isFeatured, isChallenge);
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to publish post.');
  }
});

export const savePost = createAsyncThunk('posts/savePost', async ({ post, postElements, isFeatured, isChallenge }, thunkAPI) => {
  try {
    return await postService.savePost(post, postElements, isFeatured, isChallenge);
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to save post.');
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