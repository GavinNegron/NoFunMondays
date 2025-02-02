import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../features/posts/postSlice';
import taskReducer from '../features/tasks/taskSlice.js';
import userReducer from '../features/users/userSlice.js';
import fortniteAPIReducer from '../features/fortniteAPI/fortniteAPISlice';

export const store = configureStore({
  reducer: {
    posts: postReducer,
    tasks: taskReducer,
    user: userReducer,
    fortniteAPI: fortniteAPIReducer,
  },
});