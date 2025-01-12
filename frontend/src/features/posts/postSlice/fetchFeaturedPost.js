import { createAsyncThunk } from '@reduxjs/toolkit';
import fetchFeaturedPostService from '../postService/fetchFeaturedPost';

export const fetchFeaturedPost = createAsyncThunk('posts/fetchFeatured', async (_, thunkAPI) => {
  try {
    return await fetchFeaturedPostService();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch featured post');
  }
});
