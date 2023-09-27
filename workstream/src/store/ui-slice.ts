import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState : { isSidebarOpen : false },
  reducers: {
    toggle(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    }
  }
})

export const uiActions = uiSlice.actions;

export default uiSlice;