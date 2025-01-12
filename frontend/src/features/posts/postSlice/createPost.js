import { createAsyncThunk } from '@reduxjs/toolkit';
import createPostService from '../postService/createPost';

export const createPost = createAsyncThunk('posts/create', async (newPost, thunkAPI) => {
  try {
    return await createPostService(newPost);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to create post');
  }
});
