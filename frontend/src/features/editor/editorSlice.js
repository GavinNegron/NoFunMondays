import { createSlice } from '@reduxjs/toolkit';
import elements from '../../data/elements';

const initialState = {
  style: {
    color: '#000000',
    fontSize: 18,
    fontFamily: '',
    fontWeight: 'normal',
    currentType: 'default-text',
    marginTop: 0,
    marginLeft: 0,
    marginBottom: 0,
    marginRight: 0
  },
  elements, 
  inputValues: [], 
  selectedElement: null
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setSelectedElement: (state, action) => {
      state.selectedElement = action.payload;
    },
    setInputValues: (state, action) => {
      state.inputValues = action.payload; // Update the inputValues array in the Redux store
    }
  }
});

export const { setSelectedElement, setInputValues } = editorSlice.actions;

export default editorSlice.reducer;
