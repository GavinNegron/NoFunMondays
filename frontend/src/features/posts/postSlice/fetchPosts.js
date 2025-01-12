import { createAsyncThunk } from '@reduxjs/toolkit';
import fetchPostsService from '../postService/fetchPosts';

export const fetchPosts = createAsyncThunk('posts/fetch', async ({ limit, excludeFeatured = false }, thunkAPI) => {
  try {
    return await fetchPostsService(limit, excludeFeatured);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch posts');
  }
});
