import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../features/posts/postSlice';
import userReducer from '../features/users/userSlice.js';
import publicReducer from '../features/public/publicSlice.js';
import fortniteAPIReducer from '../features/fortniteAPI/fortniteAPISlice';

export const store = configureStore({
  reducer: {
    posts: postReducer,
    user: userReducer,
    public: publicReducer,
    fortniteAPI: fortniteAPIReducer,
  },
});