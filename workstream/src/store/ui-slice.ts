import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState : { 
    isSidebarOpen : true,
    isSubbarOpen: false,
    draggingItem: null,
    dropTarget: null,
  },
  reducers: {
    toggle(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSubToolBar(state, action) {
      state.isSubbarOpen = action.payload;
    },
    setDraggingItem(state, action) {
      state.draggingItem = action.payload;
    },
    setDropTarget(state,action) {
      state.dropTarget = action.payload;
    },
    resetDropTarget: (state) => {
      state.dropTarget = null;
    },
  }
})

export const uiActions = uiSlice.actions;

export default uiSlice;