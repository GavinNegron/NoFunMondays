import { createAsyncThunk } from '@reduxjs/toolkit';
import postService from '../postService';

export const fetchPosts = createAsyncThunk('posts/fetch', async ({ limit, excludeFeatured = false }, thunkAPI) => {
  try {
    return await postService.fetchPosts(limit, excludeFeatured);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch posts');
  }
});
