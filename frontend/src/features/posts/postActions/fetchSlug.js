import { createAsyncThunk } from '@reduxjs/toolkit';
import fetchSlugService from '../postService/fetchSlug';

export const fetchSlug = createAsyncThunk(
  'posts/fetchSlug',
  async (slug, thunkAPI) => {
    try {
      const response = await fetchSlugService(slug);
      return response; 
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch post');
    }
  }
);
