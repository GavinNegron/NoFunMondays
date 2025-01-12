import { createAsyncThunk } from '@reduxjs/toolkit';
import fetchTasksService from '../taskService/fetchTasks';

export const fetchTasks = createAsyncThunk('tasks/fetch', async ({ limit, excludeFeatured = false }, thunkAPI) => {
  try {
    return await fetchTasksService(limit, excludeFeatured);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch tasks');
  }
});
