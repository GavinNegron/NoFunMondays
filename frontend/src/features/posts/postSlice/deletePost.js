import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import deletePostService from '../postService/deletePost';

export const deletePost = createAsyncThunk('posts/delete', async (postId, thunkAPI) => {
  try {
    return await deletePostService(postId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete post');
  }
});

const deletePostSlice = createSlice({
  name: 'deletePost',
  initialState: {
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default deletePostSlice.reducer;