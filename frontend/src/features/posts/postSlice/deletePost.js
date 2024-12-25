import { createAsyncThunk } from '@reduxjs/toolkit';
import postService from '../postService';

export const deletePost = createAsyncThunk('posts/delete', async (postId, thunkAPI) => {
  try {
    const response = await postService.deletePost(postId);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete post');
  }
});
