import { createSlice } from '@reduxjs/toolkit';

const textEditorSlice = createSlice({
  name: 'textEditor',
  initialState: {
    text: '',
  },
  reducers: {
    setText: (state, action) => {
      state.text = action.payload;
    },
  },
});

export const textEditorActions = textEditorSlice.actions;

export default textEditorSlice;
