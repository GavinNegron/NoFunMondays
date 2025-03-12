import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../features/posts/postSlice.js';
import userReducer from '../features/users/userSlice.js';
import publicReducer from '../features/public/publicSlice.js';
import adminReducer from '../features/admin/adminSlice.js';

export const store = configureStore({
  reducer: {
    posts: postReducer,
    user: userReducer,
    public: publicReducer,
    admin: adminReducer,
  },
});