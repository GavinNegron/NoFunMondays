import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import createPostService from '../postService/createPost';

export const createPost = createAsyncThunk('posts/create', async (newPost, thunkAPI) => {
  try {
    return await createPostService(newPost);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to create post');
  }
});

const createPostSlice = createSlice({
  name: 'createPost',
  initialState: {
    newPost: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newPost = action.payload;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default createPostSlice.reducer;