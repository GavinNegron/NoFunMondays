import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from './postService'; // Import the postService to fetch posts

// Fetch all posts
export const fetchPosts = createAsyncThunk('posts/fetch', async (_, thunkAPI) => {
  try {
    return await postService.fetchPosts(); // Fetch posts from the service
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || 'Failed to fetch posts'
    );
  }
});

// Fetch the featured post
export const fetchFeaturedPost = createAsyncThunk('posts/fetchFeatured', async (_, thunkAPI) => {
  try {
    return await postService.fetchFeaturedPost(); // Fetch featured post from the service
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || 'Failed to fetch featured post'
    );
  }
});

// Initial state
const initialState = {
  posts: [], // Array to store all posts
  featuredPost: null, // Featured post data
  isLoading: false, // Loading state
  error: null, // Error message
};

// Create the slice
const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all posts
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = Array.isArray(action.payload) ? action.payload : []; // Ensure payload is an array
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch the featured post
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
