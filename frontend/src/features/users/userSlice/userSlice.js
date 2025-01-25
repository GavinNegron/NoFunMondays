import { createSlice } from '@reduxjs/toolkit';
import { userLogin } from '../userActions/userLogin';

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
        .addCase(userLogin.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(userLogin.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload;
        })
        .addCase(userLogin.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        })
    }
});

export const { loginRequest, loginSuccess, loginFailure, logout } = userSlice.actions;

export default userSlice.reducer;
