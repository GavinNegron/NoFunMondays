import { createAsyncThunk } from '@reduxjs/toolkit';
import updatePostService from '../postService/updatePost';

export const updatePost = createAsyncThunk('posts/update', async ({ postId, updatedPost }, thunkAPI) => {
  try {
    return await updatePostService(postId, updatedPost);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update post');
  }
});
