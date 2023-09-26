import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState : { toggleIsVisible : false },
  reducers: {
    toggle(state) {
      state.toggleIsVisible = !state.toggleIsVisible;
    }
  }
})

export const uiActions = uiSlice.actions;

export default uiSlice;