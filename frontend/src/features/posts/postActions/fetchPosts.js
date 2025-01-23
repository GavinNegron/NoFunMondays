import { createAsyncThunk } from '@reduxjs/toolkit';
import fetchPostsService from '../postService/fetchPosts';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ limit, excludeFeatured }, thunkAPI) => {
    try {
      const response = await fetchPostsService(limit, excludeFeatured);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch posts');
    }
  }
);