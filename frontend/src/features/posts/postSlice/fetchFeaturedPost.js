import { createAsyncThunk } from '@reduxjs/toolkit';
import postService from '../postService';

export const fetchFeaturedPost = createAsyncThunk('posts/fetchFeatured', async (_, thunkAPI) => {
  try {
    return await postService.fetchFeaturedPost();
  } catch (error) {
    if (error.response?.status === 404) {
      return null; 
    }
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch featured post');
  }
});