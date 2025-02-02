import { createAsyncThunk } from '@reduxjs/toolkit';
import * as fortniteAPIService from './fortniteAPIService';

export const fetchShop = createAsyncThunk('fortniteAPI/fetchShop', async (thunkAPI) => {
  try {
    const response = await fortniteAPIService.fetchShop();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch item shop');
  }
});