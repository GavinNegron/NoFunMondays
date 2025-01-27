import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../features/posts/postSlice';
//import taskReducer from '../features/tasks/index';
import userReducer from '../features/users/userSlice.js';

export const store = configureStore({
  reducer: {
    posts: postReducer,
   // tasks: taskReducer,
    user: userReducer,
  },
});