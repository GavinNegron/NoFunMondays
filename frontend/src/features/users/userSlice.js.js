import { combineReducers, createSlice } from '@reduxjs/toolkit';
import * as userAction from './userAction';


const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(userAction.userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userAction.userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(userAction.userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const userReducer = combineReducers({
  user: userSlice.reducer, 
});

export const { loginRequest, loginSuccess, loginFailure, logout } = userSlice.actions;

export default userReducer;
