import { createSlice, combineReducers } from '@reduxjs/toolkit';
import * as adminAction from './adminAction';

const initialState = {
  isLoading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminAction.fetchMessages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(adminAction.fetchMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload; 
      })
      .addCase(adminAction.fetchMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const adminReducer = combineReducers({
  fortnite: adminSlice.reducer, 
});

export default adminReducer;