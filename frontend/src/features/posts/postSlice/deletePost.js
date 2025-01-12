import { createAsyncThunk } from '@reduxjs/toolkit';
import deletePostService from '../postService/deletePost';

export const deletePost = createAsyncThunk('posts/delete', async (postId, thunkAPI) => {
  try {
    return await deletePostService(postId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete post');
  }
});
