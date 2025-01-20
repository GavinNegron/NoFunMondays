import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchSlugService from '../postService/fetchSlug';

export const fetchSlug = createAsyncThunk(
  'posts/fetchSlug', 
  async ({ slug, setPost }, thunkAPI) => {
    try {
      const response = await fetchSlugService(slug);
      if (setPost) setPost(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch post');
    }
  }
);

const fetchSlugSlice = createSlice({
  name: 'fetchSlug',
  initialState: {
    post: null,
    postElements: [], 
    isLoading: false,
    error: null,
  },
  reducers: {
    addPostElement: (state, action) => {
      state.postElements.push(action.payload);
    },
    deletePostElement: (state, action) => {
      state.postElements = state.postElements.filter(element => element.id !== action.payload);
    },
  },
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

export const { addPostElement, deletePostElement } = fetchSlugSlice.actions;

export default fetchSlugSlice.reducer;