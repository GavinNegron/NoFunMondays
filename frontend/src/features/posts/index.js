import { combineReducers } from '@reduxjs/toolkit';
import postSlice from './postSlice/postSlice';

const postsReducer = combineReducers({
  post: postSlice, 
});

export default postsReducer;