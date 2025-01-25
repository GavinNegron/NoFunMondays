import { createAsyncThunk } from '@reduxjs/toolkit';
import userLoginService from '../userService/userLogin';

export const userLogin = createAsyncThunk(
  'users/userLogin',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await userLoginService(email, password);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to login user');
    }
  }
);
