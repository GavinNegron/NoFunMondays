import { createAsyncThunk } from '@reduxjs/toolkit';
import fetchFeaturedPostService from '../postService/fetchFeaturedPost';

export const fetchFeaturedPost = createAsyncThunk(
  'posts/fetchFeaturedPost',
  async (_, thunkAPI) => {
    try {
      const response = await fetchFeaturedPostService();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch posts');
    }
  }
);
