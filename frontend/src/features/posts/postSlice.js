import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from './postService';

// fetchPosts with dynamic limit
export const fetchPosts = createAsyncThunk('posts/fetch', async (limit, thunkAPI) => {
  try {
    return await postService.fetchPosts(limit);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch posts');
  }
});

// fetchFeaturedPost
export const fetchFeaturedPost = createAsyncThunk('posts/fetchFeatured', async (_, thunkAPI) => {
  try {
    return await postService.fetchFeaturedPost();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch featured post');
  }
});

// deletePost
export const deletePost = createAsyncThunk('posts/delete', async (postId, thunkAPI) => {
  try {
    const response = await postService.deletePost(postId);
    return response; // Return the response data after deletion
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete post');
  }
});

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    featuredPost: null,
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
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = state.posts.filter(post => post._id !== action.payload._id); // Remove the deleted post from the list
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Store error message if deletion failed
      })
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
        state.featuredPost = null;
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;
