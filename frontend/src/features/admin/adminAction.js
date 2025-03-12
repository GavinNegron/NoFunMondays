import { createAsyncThunk } from '@reduxjs/toolkit';
import * as adminService from './adminService';

export const fetchMessages = createAsyncThunk('admin/fetchMessages', async (limit, thunkAPI) => {
  try {
    const response = await adminService.fetchMessages({ limit });
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch messages');
  }
});