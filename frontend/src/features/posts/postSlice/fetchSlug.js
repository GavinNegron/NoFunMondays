import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchSlugService from '../postService/fetchSlug';

export const fetchSlug = createAsyncThunk('posts/fetchSlug', async (slug, thunkAPI) => {
  try {
    return await fetchSlugService(slug);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch post');
  }
});

const fetchSlugSlice = createSlice({
  name: 'fetchSlug',
  initialState: {
    post: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlug.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSlug.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload;
      })
      .addCase(fetchSlug.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default fetchSlugSlice.reducer;