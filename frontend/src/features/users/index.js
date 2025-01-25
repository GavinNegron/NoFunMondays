import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './userSlice/userSlice';

const userReducer = combineReducers({
  user: userSlice, 
});

export default userReducer;