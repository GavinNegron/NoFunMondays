import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import postReducer from '../features/posts/postSlice/index'
import editorReducer from '../features/editor/editorSlice';


export const store = configureStore({
  reducer: {
    posts: postReducer,
    editor: editorReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});
