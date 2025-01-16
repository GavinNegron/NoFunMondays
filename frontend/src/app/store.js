import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../features/posts/postSlice/index';
import taskReducer from '../features/tasks/taskSlice/index';

export const store = configureStore({
  reducer: {
    posts: postReducer,
    tasks: taskReducer,
  },
});