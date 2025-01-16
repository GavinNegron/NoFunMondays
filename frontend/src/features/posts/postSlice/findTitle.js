import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import findTitleService from '../postService/findTitle';

export const findTitle = createAsyncThunk('posts/findTitle', async (title, thunkAPI) => {
  try {
    return await findTitleService(title);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to check title availability');
  }
});

const findTitleSlice = createSlice({
  name: 'findTitle',
  initialState: {
    titleAvailable: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findTitle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(findTitle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.titleAvailable = action.payload;
      })
      .addCase(findTitle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default findTitleSlice.reducer;