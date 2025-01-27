import { createSlice, combineReducers } from '@reduxjs/toolkit';
import * as postAction from './postAction';

const initialState = {
  post: null,
  posts: [],
  featuredPost: null,
  postElements: [],
  isLoading: false,
  error: null,
  newPost: null,
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
      .addCase(postAction.fetchSlug.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postAction.fetchSlug.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload;
        state.postElements = action.payload.elements;
      })
      .addCase(postAction.fetchSlug.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(postAction.fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postAction.fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(postAction.fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(postAction.fetchFeaturedPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postAction.fetchFeaturedPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featuredPost = action.payload;
      })
      .addCase(postAction.fetchFeaturedPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(postAction.deletePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postAction.deletePost.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(postAction.deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(postAction.createPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postAction.createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newPost = action.payload;
      })
      .addCase(postAction.createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const postsReducer = combineReducers({
  post: postSlice.reducer, 
});

export default postsReducer;