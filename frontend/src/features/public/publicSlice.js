import { combineReducers, createSlice } from '@reduxjs/toolkit';
import * as publicAction from './publicAction';


const initialState = {
  message: null,
  loading: false,
  error: null,
};

const publicSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(publicAction.contact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(publicAction.contact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(publicAction.contact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const publicReducer = combineReducers({
  public: publicSlice.reducer, 
});

export default publicReducer;