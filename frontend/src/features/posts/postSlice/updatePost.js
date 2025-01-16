import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import updatePostService from '../postService/updatePost';

export const updatePost = createAsyncThunk('posts/update', async ({ postId, updatedPost }, thunkAPI) => {
  try {
    return await updatePostService(postId, updatedPost);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update post');
  }
});

const updatePostSlice = createSlice({
  name: 'updatePost',
  initialState: {
    updatedPost: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updatedPost = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default updatePostSlice.reducer;