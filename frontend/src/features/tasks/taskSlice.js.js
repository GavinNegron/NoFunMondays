import { createSlice, combineReducers } from '@reduxjs/toolkit';
import * as taskAction from './taskAction';

const initialState = {
  isLoading: false,
  tasks: [],
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(taskAction.fetchTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(taskAction.fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
        state.postElements = action.payload.elements;
      })
      .addCase(taskAction.fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    }
});

const taskReducer = combineReducers({
  task: taskSlice.reducer, 
});

export default taskReducer;