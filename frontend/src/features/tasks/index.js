import { combineReducers } from '@reduxjs/toolkit';
import taskSlice from './taskSlice/taskSlice';

const taskReducer = combineReducers({
  task: taskSlice, 
});

export default taskReducer;