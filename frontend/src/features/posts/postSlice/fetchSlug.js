import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchSlugService from '../postService/fetchSlug';

export const fetchSlug = createAsyncThunk('posts/fetchSlug', async (slug, thunkAPI) => {
  try {
    const response = await fetchSlugService(slug);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch post');
  }
});


const fetchSlugSlice = createSlice({
  name: 'fetchSlug',
  initialState: {
    post: null,  
    postElements: [],  
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
        state.postElements = action.payload?.elements || []; 
      })
      .addCase(fetchSlug.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default fetchSlugSlice.reducer;
