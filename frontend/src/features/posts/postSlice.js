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
        const { newElement, insertIndex } = action.payload;
        state.postElements.splice(insertIndex, 0, newElement);
      }
    },
    deletePostElement: (state, action) => {
      if (state.post) {
        state.postElements = state.postElements.filter(
          (element) => element.id !== action.payload
        );
      }
    },
    updatePostElement: (state, action) => {
      if (state.post) {
        const { elementId, updatedContent } = action.payload;
        const elementIndex = state.postElements.findIndex(
          (element) => element.id === elementId
        );
        if (elementIndex !== -1) {
          state.postElements[elementIndex].content = updatedContent;
        }
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
      })
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
      })
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
      })
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
      })
      .addCase(postAction.fetchPostViews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postAction.fetchPostViews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.views = action.payload;
      })
      .addCase(postAction.fetchPostViews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const postsReducer = combineReducers({
  post: postSlice.reducer, 
});

export const { addPostElement, deletePostElement, updatePostElement } = postSlice.actions;
export default postsReducer;