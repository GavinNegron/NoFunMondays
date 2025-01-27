import { createAsyncThunk } from '@reduxjs/toolkit';
import * as userService from './userService';

export const userLogin = createAsyncThunk(
  'users/userLogin',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await userService.userLogin(email, password);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to login user');
    }
  }
);