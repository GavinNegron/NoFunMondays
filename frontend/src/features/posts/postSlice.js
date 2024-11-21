import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from './postService'; // Import the postService to fetch posts

// fetchPosts
export const fetchPosts = createAsyncThunk('posts/fetch', async (_, thunkAPI) => {
  try {
    // Call the service function to fetch posts
    return await postService.fetchPosts();
  } catch (error) {
    // Handle errors and return the error message
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch posts');
  }
});

// fetchFeaturedPost
export const fetchFeaturedPost = createAsyncThunk('posts/fetchFeatured', async (_, thunkAPI) => {
  try {
    return await postService.fetchFeaturedPost();
  } catch(error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch featured post')
  }
})

// postSlice
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