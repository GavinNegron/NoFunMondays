import { createAsyncThunk } from '@reduxjs/toolkit';
import deletePostService from '../postService/deletePost';

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId, thunkAPI) => {
    try {
      const response = await deletePostService(postId);
      return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete post');
    }
  }
);