import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchFeaturedPostService from '../postService/fetchFeaturedPost';

export const fetchFeaturedPost = createAsyncThunk('posts/fetchFeatured', async (_, thunkAPI) => {
  try {
    return await fetchFeaturedPostService();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch featured post');
  }
});

const fetchFeaturedPostSlice = createSlice({
  name: 'fetchFeaturedPost',
  initialState: {
    featuredPost: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featuredPost = action.payload;
      })
      .addCase(fetchFeaturedPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default fetchFeaturedPostSlice.reducer;