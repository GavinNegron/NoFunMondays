import { createSlice, combineReducers } from '@reduxjs/toolkit';
import * as fortniteAPIAction from './fortniteAPIAction';

const initialState = {
  isLoading: false,
  shopItems: [], // Ensure this is initialized
  error: null,
};

const fortniteAPISlice = createSlice({
  name: 'fortniteAPI',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fortniteAPIAction.fetchShop.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fortniteAPIAction.fetchShop.fulfilled, (state, action) => {
        console.log('Fetched shop items:', action.payload);
        state.isLoading = false;
        state.shopItems = action.payload; 
      })
      .addCase(fortniteAPIAction.fetchShop.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const fortniteAPIReducer = combineReducers({
  fortnite: fortniteAPISlice.reducer, 
});

export default fortniteAPIReducer;