import { createAsyncThunk } from '@reduxjs/toolkit';
import * as publicService from './publicService';

export const contact = createAsyncThunk(
  'public/contact',
  async ({ email, name, message }, thunkAPI) => {
    try {
      const response = await publicService.contact(email, name, message);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to send contact message');
    }
  }
);