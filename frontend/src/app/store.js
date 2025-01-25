import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../features/posts/index';
//import taskReducer from '../features/tasks/index';
import userReducer from '../features/users/index';

export const store = configureStore({
  reducer: {
    posts: postReducer,
   // tasks: taskReducer,
    user: userReducer,
  },
});