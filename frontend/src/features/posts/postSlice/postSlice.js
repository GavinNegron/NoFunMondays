import { createSlice } from '@reduxjs/toolkit';
import { fetchSlug } from '../postActions/fetchSlug';
import { fetchPosts } from '../postActions/fetchPosts';
import { fetchFeaturedPost } from '../postActions/fetchFeaturedPost';
import { deletePost } from '../postActions/deletePost';

const initialState = {
  post: null,
  posts: [],
  isLoading: false,
  error: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPostElement: (state, action) => {
      if (state.post) {
        state.postElements = [...state.postElements, action.payload];
      }
    },
    deletePostElement: (state, action) => {
      if (state.post) {
        state.postElements = state.postElements.filter(
          (element) => element.id !== action.payload
        );
      }
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
        state.postElements = action.payload.elements;
      })
      .addCase(fetchSlug.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
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
    builder
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;