import { createAsyncThunk } from '@reduxjs/toolkit';
import findTitleService from '../postService/findTitle';

export const findTitle = createAsyncThunk('posts/findTitle', async (title, thunkAPI) => {
  try {
    return await findTitleService(title);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to check title availability');
  }
});
