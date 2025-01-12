import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts } from './fetchPosts'
import { findTitle } from './findTitle'
import { createPost } from './createPost'
import { deletePost } from './deletePost'
import { updatePost } from './updatePost'
import { fetchFeaturedPost } from './fetchFeaturedPost'

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
        state.posts = state.posts.filter(post => post._id !== action.payload._id);
      })
      .addCase(deletePost.rejected, (state, action) => {
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
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = state.posts.map(post => 
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(findTitle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(findTitle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.titleAvailable = action.payload;
      })
      .addCase(findTitle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;
