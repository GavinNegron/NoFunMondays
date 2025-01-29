import { createAsyncThunk } from '@reduxjs/toolkit';
import * as taskService from './taskService';

export const fetchTasks = createAsyncThunk(
  'tasks/fetch', async ({ taskLimit }, thunkAPI) => {
  try {
    const response = await taskService.fetchTasks(taskLimit);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch tasks');
  }
});

export const updateTaskStatus = createAsyncThunk(
  'tasks/updateTaskStatus',
  async ({ taskId, taskStatus }, thunkAPI) => {
    try {
      const response = await taskService.updateTaskStatus(taskId, taskStatus);
      return response; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update task status');
    }
  }
);