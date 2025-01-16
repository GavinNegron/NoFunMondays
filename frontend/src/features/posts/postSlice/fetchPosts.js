import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchPostsService from '../postService/fetchPosts';

export const fetchPosts = createAsyncThunk('posts/fetch', async ({ limit, excludeFeatured = false }, thunkAPI) => {
  try {
    return await fetchPostsService(limit, excludeFeatured);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch posts');
  }
});

const fetchPostsSlice = createSlice({
  name: 'fetchPosts',
  initialState: {
    posts: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default fetchPostsSlice.reducer;